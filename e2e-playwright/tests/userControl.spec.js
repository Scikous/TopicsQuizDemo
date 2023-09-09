const { test, expect } = require("@playwright/test");
const { userLogin } = require("../utils/testUtils.js");
//tests for user

test.beforeEach(async ({ page }) => {
  await userLogin({ page });
  //upon succesful login user is automatically redirected to /topics
  await expect(page).toHaveTitle("Topics Create");
});

test("Topics Create page does not allow user to create nor delete topics, only click links", async ({ page }) => {
    //user should not see add and delete buttons and textbox
    await expect(await page.locator("input[type=text]").count()).toBe(0);
    await expect(await page.locator("button.btn.btn-primary").count()).toBe(0);
    await expect(await page.locator("button.btn.btn-danger").count()).toBe(0);

    //test if a link works
     await page.locator('h3 a').first().click();
     await expect(page).toHaveTitle("Questions Create");
});

test("Questions Create page allows user only to add questions", async ({ page }) => {
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");

    const questions = ['groceries are real?', 'anime is real?', 'animals are real?', 'vehicles are real?', 'weapons are real?', 'sweets are real?', "power tools are real?"];

    for (const question of questions){
        //try to create question
        await page.locator("textarea").type(question);
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Questions Create");
    }

    //user should not be able to delete questions nor the topic
    await expect(await page.locator("button.btn.btn-danger").count()).toBe(0);

    // test if a link works
     await page.locator('h3 a').first().click();
     await expect(page).toHaveTitle("Question Answer Options Create");
});

test("Question Answer Options Create page has expected user add and delete functionality", async ({ page }) => {
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Question Answer Options Create");

    const questionAOs = ['groceries are not real', 'anime is real', 'animals are not real', 'vehicles are real', 'weapons are not real', 'sweets are real', "power tools are not real"];

    for (const questionAO of questionAOs){
        //try to create topic
        await page.locator("textarea").type(questionAO);
        await page.locator("input[type=checkbox]").click();
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Question Answer Options Create");
    }

    for (let i = 0; i < questionAOs.length; i++){
        //try to delete question answer option
        await page.locator("button.btn.btn-danger").nth(0).click();
        await expect(page).toHaveTitle("Question Answer Options Create");
    }

    await page.locator("button.btn.btn-danger:has-text('Delete question')").click();
    await expect(page).toHaveTitle("Questions Create");
});

test("User can logout", async ({ page }) => {
  await page.locator(`a >> text="Logout"`).click();
  await expect(page).toHaveTitle("Login");
});
