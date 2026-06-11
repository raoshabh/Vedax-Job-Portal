import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("refora123", 10);

  const arjun = await prisma.user.upsert({
    where: { email: "arjun@refora.dev" },
    update: {},
    create: {
      email: "arjun@refora.dev",
      name: "Arjun Mehta",
      passwordHash: hash,
      role: "referrer",
    },
  });

  const divya = await prisma.user.upsert({
    where: { email: "divya@zentrolabs.com" },
    update: {},
    create: {
      email: "divya@zentrolabs.com",
      name: "Divya Krishnan",
      passwordHash: hash,
      role: "company",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@refora.dev" },
    update: {},
    create: {
      email: "admin@refora.dev",
      name: "Refora Ops",
      passwordHash: hash,
      role: "admin",
    },
  });

  const zentro = await prisma.company.upsert({
    where: { slug: "zentro-labs" },
    update: {},
    create: { name: "Zentro Labs", slug: "zentro-labs", ownerId: divya.id },
  });

  const job = await prisma.job.upsert({
    where: { id: "seed-j-101" },
    update: {},
    create: {
      id: "seed-j-101",
      companyId: zentro.id,
      title: "Senior Backend Engineer",
      bountyPaise: 100000 * 100, // ₹1,00,000
      field: "backend",
      cutoff: 70,
    },
  });

  await prisma.referral.upsert({
    where: { jobId_candidateEmail: { jobId: job.id, candidateEmail: "karthik.iyer@outlook.com" } },
    update: {},
    create: {
      jobId: job.id,
      referrerId: arjun.id,
      candidateName: "Karthik Iyer",
      candidateEmail: "karthik.iyer@outlook.com",
      status: "Interviewing",
      claimExpiresAt: new Date(Date.now() + 96 * 3600 * 1000),
    },
  });

  console.log("seeded:", { arjun: arjun.email, company: zentro.slug, job: job.title });
}

main().finally(() => prisma.$disconnect());
