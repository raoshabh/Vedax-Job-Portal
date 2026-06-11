// Double-entry escrow ledger. Every transaction posts balanced legs (sum =
// 0), is idempotent via idemKey, and can never overdraw a company's escrow.
import { prisma } from "./db";

export const REFERRER_SHARE = 0.8; // base tier; per-tier overrides in Phase 1

export class LedgerError extends Error {}

export async function ensureAccount(kind: string, ownerId: string | null) {
  const found = await prisma.ledgerAccount.findFirst({
    where: { kind, ownerId },
  });
  if (found) return found;
  return prisma.ledgerAccount.create({ data: { kind, ownerId } });
}

export async function balance(accountId: string) {
  const agg = await prisma.ledgerEntry.aggregate({
    where: { accountId },
    _sum: { amountPaise: true },
  });
  return agg._sum.amountPaise ?? 0;
}

interface Leg {
  accountId: string;
  amountPaise: number;
}

/** Post a balanced, idempotent transaction. Returns the existing transaction
 *  unchanged if idemKey was already posted. Escrow accounts can't go negative. */
export async function post(opts: {
  idemKey: string;
  kind: string;
  legs: Leg[];
  refType?: string;
  refId?: string;
}) {
  const sum = opts.legs.reduce((s, l) => s + l.amountPaise, 0);
  if (sum !== 0)
    throw new LedgerError(`unbalanced transaction: legs sum to ${sum}`);
  if (opts.legs.some((l) => !Number.isInteger(l.amountPaise)))
    throw new LedgerError("amounts must be integer paise");

  return prisma.$transaction(async (tx) => {
    const existing = await tx.ledgerTransaction.findUnique({
      where: { idemKey: opts.idemKey },
      include: { entries: true },
    });
    if (existing) return { transaction: existing, replayed: true };

    // overdraw check: escrow & referrer accounts may never go negative
    for (const leg of opts.legs) {
      if (leg.amountPaise >= 0) continue;
      const account = await tx.ledgerAccount.findUniqueOrThrow({
        where: { id: leg.accountId },
      });
      if (account.kind === "EXTERNAL") continue;
      const agg = await tx.ledgerEntry.aggregate({
        where: { accountId: leg.accountId },
        _sum: { amountPaise: true },
      });
      const current = agg._sum.amountPaise ?? 0;
      if (current + leg.amountPaise < 0)
        throw new LedgerError(
          `insufficient funds in ${account.kind}: have ${current}, need ${-leg.amountPaise}`,
        );
    }

    const transaction = await tx.ledgerTransaction.create({
      data: {
        idemKey: opts.idemKey,
        kind: opts.kind,
        refType: opts.refType,
        refId: opts.refId,
        entries: { create: opts.legs },
      },
      include: { entries: true },
    });
    return { transaction, replayed: false };
  });
}

/** Company tops up its escrow from the outside world. */
export async function fundEscrow(companyId: string, amountPaise: number) {
  const escrow = await ensureAccount("COMPANY_ESCROW", companyId);
  const external = await ensureAccount("EXTERNAL", null);
  return post({
    idemKey: `fund:${companyId}:${amountPaise}:${Date.now()}`,
    kind: "FUND",
    refType: "company",
    refId: companyId,
    legs: [
      { accountId: escrow.id, amountPaise },
      { accountId: external.id, amountPaise: -amountPaise },
    ],
  });
}

/** Release one bounty milestone (half the bounty): 80% of the half to the
 *  referrer, 20% to platform revenue. Idempotent per referral+milestone. */
export async function releaseMilestone(
  referralId: string,
  milestone: "HIRE" | "RETENTION_90D",
) {
  const referral = await prisma.referral.findUniqueOrThrow({
    where: { id: referralId },
    include: { job: { include: { company: true } } },
  });
  const half = Math.round(referral.job.bountyPaise / 2);
  const toReferrer = Math.round(half * REFERRER_SHARE);
  const toPlatform = half - toReferrer;

  const escrow = await ensureAccount(
    "COMPANY_ESCROW",
    referral.job.companyId,
  );
  const referrerAcct = await ensureAccount("REFERRER", referral.referrerId);
  const platform = await ensureAccount("PLATFORM_REVENUE", null);

  const result = await post({
    idemKey: `milestone:${referralId}:${milestone}`,
    kind: `MILESTONE_${milestone}`,
    refType: "referral",
    refId: referralId,
    legs: [
      { accountId: escrow.id, amountPaise: -half },
      { accountId: referrerAcct.id, amountPaise: toReferrer },
      { accountId: platform.id, amountPaise: toPlatform },
    ],
  });

  if (!result.replayed) {
    await prisma.payout.create({
      data: {
        referralId,
        recipientId: referral.referrerId,
        milestone,
        amountPaise: toReferrer,
        transactionId: result.transaction.id,
      },
    });
    await prisma.referral.update({
      where: { id: referralId },
      data: { status: milestone === "HIRE" ? "Hired" : "Paid" },
    });
  }
  return result;
}
