const { test, expect } = require("@playwright/test");
const { adminLogin, questionsPageNav, questionAnswerOptionsPageNav } = require("../utils/testUtils.js");
//test for user

test.beforeEach(async ({ page }) => {
  await adminLogin({ page });
  //upon succesful login user is automatically redirected to /topics
  await expect(page).toHaveTitle("Topics Create");
});

test("Topics create page has expected errors", async ({ page }) => {
    //user should not see add and delete buttons and textbox
    await page.locator("button.btn.btn-primary:has-text('Add')").click();
    await expect(page).toHaveTitle("Topics Create");
    await expect(page.locator('ul li p').nth(0)).toHaveText("topic characters length must be between 1-255");
    await expect(page.locator('ul li p').nth(1)).toHaveText("topic is required");
   
    //already in database        
    await page.locator("input[type=text]").type("Finnish language");
    await page.locator("button.btn.btn-primary:has-text('Add')").click();
    await expect(page.locator('ul li p').nth(0)).toHaveText("Topic exists already");
    

});

test("Question create page has expected errors", async ({ page }) => {
  await questionsPageNav({page});

  //empty error
  await page.locator("button.btn.btn-primary:has-text('Add')").click();
  await expect(page.locator('ul li p').nth(0)).toHaveText("question_text cannot be lower than 1 characters");
  await expect(page.locator('ul li p').nth(1)).toHaveText("question_text is required");

  //already in database
  await page.locator("textarea").type("You can create made up words and still be understood fine?");
  await page.locator("button.btn.btn-primary:has-text('Add')").click();
  await expect(page.locator('ul li p').nth(0)).toHaveText("Question exists already");
  

});

test("Question answer options create page has expected errors", async ({ page }) => {
  await questionAnswerOptionsPageNav({page});

  await page.locator("button.btn.btn-primary:has-text('Add')").click();
  await expect(page.locator('ul li p').nth(0)).toHaveText("option_text cannot be lower than 1 characters");
  await expect(page.locator('ul li p').nth(1)).toHaveText("option_text is required");

  await page.locator("textarea").type("Absolutely");
  await page.locator("button.btn.btn-primary:has-text('Add')").click();
  await expect(page.locator('ul li p').nth(0)).toHaveText("Question answer option exists already");
});
