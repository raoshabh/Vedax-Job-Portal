const { chromium } = require("playwright");
const BASE = "http://localhost:3105";
const results = [];
const check = (n, ok, info = "") => results.push({ n, ok, info: String(info).slice(0, 90) });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();

  // unauthenticated -> redirected to login
  const r = await p.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  check("middleware: /dashboard redirects to login", p.url().includes("/login"), p.url());

  // wrong password rejected
  await p.fill("#email", "arjun@refora.dev");
  await p.fill("#password", "wrongpass");
  await p.click('button[type="submit"]');
  await p.waitForTimeout(1500);
  check("auth: wrong password rejected", (await p.locator("body").innerText()).includes("Wrong email or password"));

  // correct login lands on dashboard
  await p.fill("#password", "refora123");
  await p.click('button[type="submit"]');
  await p.waitForURL("**/dashboard", { timeout: 15000 });
  check("auth: referrer login -> /dashboard", p.url().endsWith("/dashboard"));
  check("auth: dashboard renders", (await p.locator("body").innerText()).includes("Good morning"));

  // role gate: referrer blocked from /admin (authorized=false -> redirect to login)
  await p.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
  check("rbac: referrer blocked from /admin", !p.url().includes("/admin") || p.url().includes("/login"), p.url());

  // company login reaches /company
  const p2 = await b.newPage();
  await p2.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await p2.fill("#email", "divya@zentrolabs.com");
  await p2.fill("#password", "refora123");
  await p2.click('button[type="submit"]');
  await p2.waitForURL("**/company", { timeout: 15000 });
  check("auth: company login -> /company", p2.url().endsWith("/company"));

  await b.close();
  let pass = 0;
  for (const x of results) { console.log(`${x.ok ? "PASS" : "FAIL"}  ${x.n}${x.ok ? "" : " -> " + x.info}`); if (x.ok) pass++; }
  console.log(`\n${pass}/${results.length} auth checks passed`);
  process.exit(pass === results.length ? 0 : 1);
})();
