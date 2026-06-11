# Refora — the referral marketplace

> Your network is worth more than a thank-you note.

People constantly refer friends and ex-colleagues into companies — and get nothing when it works out. Refora turns that into a three-sided marketplace:

- **Companies** post roles with a **cash bounty** (₹40k–₹3L per hire), funded upfront into escrow.
- **Referrers** browse bounty-backed roles, refer people they trust, and track them through the hiring pipeline.
- **Candidates** get a warm intro instead of a cold application, plus full visibility into where they stand.

When a referred candidate is **hired**, the referrer earns **80% of the bounty** — 50% on joining, 50% after the hire completes 90 days. Refora keeps 20%. If the hire leaves before 90 days, the unreleased half returns to the company's escrow, keeping incentives honest for everyone.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

> **No Node on this machine?** A portable Node 22 toolchain is installed at
> `~/.local/toolchains/node-v22.16.0-darwin-arm64/bin` — add it to your PATH or
> run `./start.sh` to serve the production build directly.

No environment variables needed — the app runs entirely on a typed mock-data layer (`lib/data.ts`, `lib/company-data.ts`) so every screen renders realistic content.

## Sitemap

### Marketing (public)
| Route | Screen |
|---|---|
| `/` | **Immersive landing** — scroll-scrubbed 3D "referral constellation" (Three.js + GSAP ScrollTrigger): 5 cinematic chapters, payout counter, live bounties, CTA. Honors `prefers-reduced-motion` |
| `/classic` | Classic landing — hero, how it works, live bounties, features, company band, testimonials, FAQ |
| `/assessments` | Skill Passport — prescreening catalog + interactive sample test player that issues a scored passport |
| `/jobs` | Public job board with bounty amounts |
| `/jobs/[id]` | Job detail + bounty sidebar (escrow guarantee, refer/apply CTAs) |
| `/pricing` | Company pricing — pay-per-hire (20%), Growth (₹49,999/mo + 12%), Enterprise |
| `/login`, `/signup` | Auth; signup picks a side of the marketplace |

### Referrer app (`/dashboard`)
| Route | Screen |
|---|---|
| `/dashboard` | Overview — lifetime earnings, pending payouts, active referrals, trust score, earnings chart |
| `/dashboard/jobs` | Browse referral-eligible roles |
| `/dashboard/referrals` | Pipeline table of every referral with stage and payout |
| `/dashboard/refer` | New referral form — pick role, candidate details, vouch note, consent (live payout preview) |
| `/dashboard/earnings` | Wallet — paid / processing / scheduled, payout method (UPI), TDS note, history |
| `/dashboard/settings` | Profile, payout & tax details, notifications |

### Company portal (`/company`)
| Route | Screen |
|---|---|
| `/company` | Hiring overview — pipeline stats, escrow balance, role performance |
| `/company/jobs` | Manage roles & bounties |
| `/company/jobs/new` | Post a role — bounty slider with live fee/escrow breakdown |
| `/company/candidates` | Kanban pipeline (Submitted → Screening → Interviewing → Offer → Hired) |
| `/company/billing` | Escrow funding, releases, refunds, plan management |
| `/company/integrations` | HRMS/ATS connectors (Keka, Darwinbox, greytHR, Greenhouse…) + joiner-match monitor that auto-verifies hires and flags hidden ones |
| `/company/settings` | Company profile & team access |

### Other
| Route | Screen |
|---|---|
| `/candidate` | Candidate tracker — referral journey timeline, vouch note, next interview, consent controls |
| `/admin` | Platform ops — GMV/revenue, hire-verification & dispute queue (HRMS match, EPFO checks, candidate attestation), payout releases, trust & safety flags, top referrers |

## Business model

1. **Take rate**: 20% of every bounty (12% on the Growth plan).
2. **SaaS subscriptions**: Growth ₹49,999/mo; Enterprise custom (internal employee-referral mode, SSO, audit logs).
3. **Float**: bounties sit in escrow from posting to payout.

Trust mechanics that make the marketplace work:
- **Escrow-first** — a job can't go live until its bounty is funded, so payouts are never IOUs.
- **Milestone payouts** — 50/50 split across joining and 90-day retention aligns referrers with quality, not volume.
- **Trust score** — referrers build a 0–100 score; spam/fake referrals tank it, quality referrals unlock premium bounties.
- **Candidate consent** — nothing is shared with a company until the candidate explicitly opts in.
- **Skill Passport prescreening** — one proctored, field-specific test issues a reusable scored passport; referrals only reach a company once the candidate clears the role's cutoff.
- **HRMS-verified hires** — joiner/exit webhooks (Keka, Darwinbox, greytHR…) match new employees against referrals from the last 12 months: milestones release automatically, hidden hires get invoiced, and retention is read from payroll instead of company say-so. Integrated companies pay 12% instead of 20%.
- **Dispute & verification queue** — referrer reports, attestation mismatches and HRMS flags land in an admin queue with EPFO employment checks and a 12-month ownership clause behind them.

## Architecture

- **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4**, icons via `lucide-react`.
- Server components by default; client components only where state is needed (navbar menu, sidebar active state, referral form, bounty slider).
- `lib/data.ts` is the single source of truth for entities (companies, jobs, referrals, payouts) — designed to be swapped for a real API layer without touching the pages.

## Productionizing roadmap

1. **Auth** — NextAuth/Auth.js with Google + LinkedIn OAuth, role-based access (referrer / company / candidate / admin).
2. **Database** — Postgres + Prisma; the interfaces in `lib/data.ts` map 1:1 to tables.
3. **Payments** — Razorpay Route / Stripe Connect for escrow + split payouts; webhook-driven milestone releases; TDS ledger.
4. **Notifications** — email (Resend) + WhatsApp for status changes and payout confirmations.
5. **ATS integrations** — Greenhouse/Lever webhooks so candidate stages sync automatically.
6. **Trust & safety** — rate limits, device fingerprinting, consent audit trail, payout holds.
