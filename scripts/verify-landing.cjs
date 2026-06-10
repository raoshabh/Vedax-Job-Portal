/* End-to-end verification of the immersive landing page.
 * Runs three profiles (desktop, mobile, reduced-motion), really scrolls the
 * film, captures frames to /tmp/refora-verify, and reports console errors,
 * payout-counter state, canvas fade behavior and an FPS estimate.
 * Usage: node scripts/verify-landing.cjs [baseUrl]
 */
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = process.argv[2] || "http://localhost:3105/";
const OUT = "/tmp/refora-verify";

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  async function profile(name, ctxOpts, reducedMotion) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    if (reducedMotion) await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForSelector("canvas", { timeout: 15000 });
    await page.waitForTimeout(1000);

    const metrics = await page.evaluate(() => {
      const cta = document.getElementById("ch-cta");
      return {
        storyEnd: cta.offsetTop + cta.offsetHeight,
        total: document.documentElement.scrollHeight,
        vh: window.innerHeight,
      };
    });

    const frames = {};
    for (const s of [0, 0.25, 0.5, 0.75, 1.0]) {
      const y = Math.round(s * (metrics.storyEnd - metrics.vh));
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(1100); // let the eased camera settle
      const path = `${OUT}/${name}-${Math.round(s * 100)}.png`;
      await page.screenshot({ path });
      frames[`${Math.round(s * 100)}%`] = path;
    }
    const counterAtEnd = await page.evaluate(
      () => document.querySelector("#ch-payoff span")?.textContent,
    );

    // below the story: canvas must fade out, bounties must be visible
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
    );
    await page.waitForTimeout(1100);
    const bottomPath = `${OUT}/${name}-bottom.png`;
    await page.screenshot({ path: bottomPath });
    frames.bottom = bottomPath;
    const fadeAtBottom = await page.evaluate(
      () => document.querySelector("canvas").parentElement.style.opacity,
    );

    // FPS estimate mid-story
    await page.evaluate(() =>
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: "instant" }),
    );
    await page.waitForTimeout(300);
    const fps = await page.evaluate(
      () =>
        new Promise((res) => {
          let n = 0;
          const t0 = performance.now();
          const tick = () => {
            n++;
            performance.now() - t0 < 2000
              ? requestAnimationFrame(tick)
              : res(Math.round(n / 2));
          };
          requestAnimationFrame(tick);
        }),
    );

    await ctx.close();
    return { errors, counterAtEnd, fadeAtBottom, fps, metrics, frames };
  }

  const report = {
    desktop: await profile("desktop", { viewport: { width: 1440, height: 900 } }),
    mobile: await profile("mobile", {
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    }),
    reduced: await profile(
      "reduced",
      { viewport: { width: 1440, height: 900 } },
      true,
    ),
  };

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
})();
