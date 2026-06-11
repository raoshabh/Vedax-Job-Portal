/* Drives the trust-layer features end to end:
 * passport gate states in the referral form, the assessment player,
 * the integrations monitor and the admin dispute queue.
 * Usage: node scripts/verify-trust.cjs [baseUrl]
 */
const { chromium } = require("playwright");

const BASE = process.argv[2] || "http://localhost:3105";
const results = [];
const check = (name, ok, info = "") =>
  results.push({ name, ok, info: String(info).slice(0, 120) });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  // ---- referral gate states ----
  await page.goto(`${BASE}/dashboard/refer`, { waitUntil: "networkidle" });
  const gateText = () => page.locator("text=Skill passport check").locator("..").innerText();

  // job j-101 (backend, default) + frontend passport -> field mismatch
  await page.fill('input[type="email"]', "priya.sharma@gmail.com");
  await page.locator('input[type="email"]').blur();
  check("gate: field mismatch", (await gateText()).includes("Frontend Engineering passport, but this role requires Backend"), await gateText());

  // switch to j-103 (frontend, cutoff 75) -> eligible 91
  await page.selectOption("select", "j-103");
  check("gate: eligible after job switch", (await gateText()).includes("Clears this role's cutoff"), await gateText());
  check("gate: submit label normal", await page.locator('button[type="submit"]').innerText().then(t => t.includes("Submit referral") && !t.includes("invite")));

  // expired passport
  await page.selectOption("select", "j-108");
  await page.fill('input[type="email"]', "meera.pillai@gmail.com");
  await page.locator('input[type="email"]').blur();
  check("gate: expired", (await gateText()).includes("expired"), await gateText());
  check("gate: submit label invite", await page.locator('button[type="submit"]').innerText().then(t => t.includes("assessment invite")));

  // missing passport
  await page.fill('input[type="email"]', "stranger@example.com");
  await page.locator('input[type="email"]').blur();
  check("gate: missing", (await gateText()).includes("No passport on file"), await gateText());

  // ---- assessment player: perfect run on Backend ----
  await page.goto(`${BASE}/assessments`, { waitUntil: "networkidle" });
  await page.locator("text=Try the sample test").first().click();
  await page.locator("text=Start sample").click();
  // both backend answers are option B (index 1)
  for (let i = 0; i < 2; i++) {
    await page.locator("button", { hasText: /^B/ }).first().click();
  }
  const result = await page.locator("text=percentile").first().innerText();
  const score = await page.locator("p.text-6xl").innerText();
  check("player: perfect score 90", score.trim() === "90", `score=${score}`);
  check("player: result copy", (await page.content()).includes("would issue a passport"));

  // ---- integrations monitor ----
  await page.goto(`${BASE}/company/integrations`, { waitUntil: "networkidle" });
  const integ = await page.content();
  check("integrations: discount banner", integ.includes("12% instead of"));
  check("integrations: hidden hire flag", integ.includes("Hidden-hire invoice raised"));
  check("integrations: keka connected", integ.includes("Keka") && integ.includes("Connected"));

  // ---- admin dispute queue ----
  await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
  const admin = await page.content();
  check("admin: dispute queue present", admin.includes("Hire verification"));
  check("admin: verified hidden hire", admin.includes("Verified hidden hire"));
  check("admin: epfo evidence chip", admin.includes("EPFO"));

  // ---- candidate passport card ----
  await page.goto(`${BASE}/candidate`, { waitUntil: "networkidle" });
  const cand = await page.content();
  check("candidate: passport card", cand.includes("Skill passport") && cand.includes("87"));

  check("no page errors anywhere", errors.length === 0, errors.join(" | "));

  await browser.close();
  let pass = 0;
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : "  -> " + r.info}`);
    if (r.ok) pass++;
  }
  console.log(`\n${pass}/${results.length} checks passed`);
  process.exit(pass === results.length ? 0 : 1);
})();
