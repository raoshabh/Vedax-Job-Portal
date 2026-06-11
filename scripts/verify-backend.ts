// Exercises the escrow ledger end to end: funding, milestone releases,
// idempotency replay, overdraw rejection, unbalanced-legs rejection, and
// zero-sum + payout invariants.
import { PrismaClient } from "@prisma/client";
import {
  balance,
  ensureAccount,
  fundEscrow,
  LedgerError,
  post,
  releaseMilestone,
} from "../lib/ledger";

const prisma = new PrismaClient();
const results: { name: string; ok: boolean; info?: string }[] = [];
const check = (name: string, ok: boolean, info = "") =>
  results.push({ name, ok, info });

async function main() {
  const company = await prisma.company.findUniqueOrThrow({
    where: { slug: "zentro-labs" },
  });
  const referral = await prisma.referral.findFirstOrThrow({
    where: { candidateEmail: "karthik.iyer@outlook.com" },
    include: { job: true },
  });

  const escrow = await ensureAccount("COMPANY_ESCROW", company.id);
  const referrerAcct = await ensureAccount("REFERRER", referral.referrerId);
  const platform = await ensureAccount("PLATFORM_REVENUE", null);

  // 1. fund ₹1,50,000
  await fundEscrow(company.id, 150000 * 100);
  const afterFund = await balance(escrow.id);
  check("fund: escrow balance", afterFund >= 150000 * 100, String(afterFund));

  // 2. hire milestone: -₹50,000 escrow, +₹40,000 referrer, +₹10,000 platform
  const before = {
    escrow: await balance(escrow.id),
    referrer: await balance(referrerAcct.id),
    platform: await balance(platform.id),
  };
  await releaseMilestone(referral.id, "HIRE");
  const after = {
    escrow: await balance(escrow.id),
    referrer: await balance(referrerAcct.id),
    platform: await balance(platform.id),
  };
  check("hire: escrow -50k", before.escrow - after.escrow === 50000 * 100);
  check("hire: referrer +40k", after.referrer - before.referrer === 40000 * 100);
  check("hire: platform +10k", after.platform - before.platform === 10000 * 100);
  const ref1 = await prisma.referral.findUniqueOrThrow({ where: { id: referral.id } });
  check("hire: status -> Hired", ref1.status === "Hired");

  // 3. idempotency: replay the same milestone — balances must not move
  const replay = await releaseMilestone(referral.id, "HIRE");
  check("idempotent: replay flagged", replay.replayed === true);
  check(
    "idempotent: balances unchanged",
    (await balance(referrerAcct.id)) === after.referrer &&
      (await balance(escrow.id)) === after.escrow,
  );
  const payoutCount = await prisma.payout.count({
    where: { referralId: referral.id, milestone: "HIRE" },
  });
  check("idempotent: exactly one payout row", payoutCount === 1, String(payoutCount));

  // 4. 90-day milestone
  await releaseMilestone(referral.id, "RETENTION_90D");
  check(
    "90d: referrer total +80k",
    (await balance(referrerAcct.id)) - before.referrer === 80000 * 100,
  );
  const ref2 = await prisma.referral.findUniqueOrThrow({ where: { id: referral.id } });
  check("90d: status -> Paid", ref2.status === "Paid");

  // 5. overdraw rejected: try to pull more than remains in escrow
  const remaining = await balance(escrow.id);
  let overdrawRejected = false;
  try {
    await post({
      idemKey: `test-overdraw-${remaining}`,
      kind: "REFUND",
      legs: [
        { accountId: escrow.id, amountPaise: -(remaining + 1) },
        { accountId: (await ensureAccount("EXTERNAL", null)).id, amountPaise: remaining + 1 },
      ],
    });
  } catch (e) {
    overdrawRejected = e instanceof LedgerError;
  }
  check("overdraw: rejected", overdrawRejected);
  check("overdraw: balance intact", (await balance(escrow.id)) === remaining);

  // 6. unbalanced legs rejected
  let unbalancedRejected = false;
  try {
    await post({
      idemKey: "test-unbalanced",
      kind: "FUND",
      legs: [{ accountId: escrow.id, amountPaise: 100 }],
    });
  } catch (e) {
    unbalancedRejected = e instanceof LedgerError;
  }
  check("unbalanced: rejected", unbalancedRejected);

  // 7. global invariant: every transaction sums to zero
  const txs = await prisma.ledgerTransaction.findMany({ include: { entries: true } });
  const allZero = txs.every(
    (t) => t.entries.reduce((s, e) => s + e.amountPaise, 0) === 0,
  );
  check("invariant: all transactions zero-sum", allZero, `${txs.length} txs`);

  let pass = 0;
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : " -> " + r.info}`);
    if (r.ok) pass++;
  }
  console.log(`\n${pass}/${results.length} ledger checks passed`);
  if (pass !== results.length) process.exit(1);
}

main().finally(() => prisma.$disconnect());
