const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("fs");

const PROFILE_URL = "https://tryhackme.com/p/ManicMookey";

const FULL_SCREENSHOT = "assets/tryhackme-profile-full.png";
const OUTPUT_IMAGE = "assets/tryhackme-stats.png";

(async () => {
  fs.mkdirSync("assets", { recursive: true });

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    viewport: {
      width: 1400,
      height: 1200
    },
    deviceScaleFactor: 1
  });

  await page.goto(PROFILE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: FULL_SCREENSHOT,
    fullPage: true
  });

  await browser.close();

  /*
    Crop settings.
    You will probably need to adjust these numbers after the first run.
    left = distance from left edge
    top = distance from top edge
    width = crop width
    height = crop height
  */
  await sharp(FULL_SCREENSHOT)
    .extract({
      left: 300,
      top: 220,
      width: 800,
      height: 350
    })
    .png()
    .toFile(OUTPUT_IMAGE);

  console.log(`Saved ${OUTPUT_IMAGE}`);
})();
