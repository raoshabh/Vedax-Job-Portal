const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
  for (const [name, url] of [["tier","/dashboard/tier"],["network","/dashboard/network"],["analytics","/company/analytics"]]) {
    await p.goto("http://localhost:3105"+url, { waitUntil: "networkidle" });
    await p.screenshot({ path: `/tmp/refora-growth-${name}.png`, fullPage: true });
  }
  await b.close(); console.log("snapped");
})();
