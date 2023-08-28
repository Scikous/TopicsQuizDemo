const { test, expect } = require("@playwright/test");

test("Home page has expected statistics", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Topics Quiz");

});