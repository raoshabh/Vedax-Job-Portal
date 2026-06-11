const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:3105";
const results = [];
const check = (n, ok, info = "") => results.push({ n, ok, info: String(info).slice(0, 100) });
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(`${BASE}/dashboard/tier`, { waitUntil: "networkidle" });
  const tier = await page.locator("body").innerText();
  check("tier: gold current", tier.includes("Gold") && tier.includes("82%"));
  check("tier: progress to platinum", tier.includes("3 more to Platinum"));
  check("tier: claim windows", tier.includes("Active claim windows") && tier.includes("41h left"));
  check("tier: urgent claim styled", tier.includes("12h left"));

  await page.goto(`${BASE}/dashboard/network`, { waitUntil: "networkidle" });
  const net = await page.locator("body").innerText();
  check("network: summary stats", net.includes("1,243") && net.includes("Strong matches"));
  check("network: match card", net.includes("Devika Rao") && net.includes("94% match"));
  check("network: earning potential inr", net.includes("₹"));
  check("network: second degree", net.includes("split the bounty 60/20"));

  await page.goto(`${BASE}/company/analytics`, { waitUntil: "networkidle" });
  const an = await page.locator("body").innerText();
  check("analytics: retention compare", an.includes("92%") && an.includes("61%"));
  check("analytics: funnel", an.includes("Referred") && an.includes("Hired"));
  check("analytics: sla note", an.includes("ranking input"));

  // nav links present
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  check("nav: referrer links", (await page.locator("body").innerText()).includes("Network x-ray"));
  await page.goto(`${BASE}/company`, { waitUntil: "networkidle" });
  check("nav: company analytics link", (await page.locator("body").innerText()).includes("Analytics"));

  check("no page errors", errors.length === 0, errors.join("|"));
  await browser.close();
  let pass = 0;
  for (const r of results) { console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.n}${r.ok ? "" : " -> " + r.info}`); if (r.ok) pass++; }
  console.log(`\n${pass}/${results.length} checks passed`);
  process.exit(pass === results.length ? 0 : 1);
})();
