const { expect } = require("@playwright/test");

const adminLogin = async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page).toHaveTitle("Login");

  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");

  await page.locator("button.btn.btn-primary").click();
};

const userLogin = async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page).toHaveTitle("Login");

  await page.locator("input[type=email]").type("user@user.com");
  await page.locator("input[type=password]").type("pass");

  await page.locator("button.btn.btn-primary").click();
};

const elementsGetter = async ({ page }, tag) => {
  const elementsRaw = await page.$$(tag);
  const elements = await Promise.all(
    elementsRaw.map((element) => element.textContent()),
  );
  return elements;
};

export { adminLogin, userLogin, elementsGetter };
