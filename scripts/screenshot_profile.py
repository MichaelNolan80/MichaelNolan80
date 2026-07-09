from playwright.sync_api import sync_playwright
from pathlib import Path
import time

PROFILE_URL = "https://tryhackme.com/p/ManicMookey"

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_FILE = BASE_DIR / "images" / "tryhackme-profile.png"

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--disable-dev-shm-usage"]
    )

    page = browser.new_page(
        viewport={"width": 1400, "height": 1000}
    )

    page.goto(
        PROFILE_URL,
        wait_until="domcontentloaded",
        timeout=60000
    )

    time.sleep(8)

    page.screenshot(
        path=str(OUTPUT_FILE),
        full_page=True
    )

    browser.close()

print(f"Saved screenshot to: {OUTPUT_FILE}")
