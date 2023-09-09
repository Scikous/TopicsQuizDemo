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
    await page.locator("input[type=text]").type("Finnish Language");
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
  await page.locator("textarea").type(questionAO);


});

test("Question answer options create page has expected errors", async ({ page }) => {
  await questionAnswerOptionsPageNav({page});

  await page.locator("button.btn.btn-primary:has-text('Add')").click();
  await expect(page.locator('ul li p').nth(0)).toHaveText("option_text cannot be lower than 1 characters");
  await expect(page.locator('ul li p').nth(1)).toHaveText("option_text is required");   
});


// test("Question Answer Options Create page has expected user add and delete functionality", async ({ page }) => {
//     await page.locator('h3 a').first().click();
//     await expect(page).toHaveTitle("Questions Create");
//     await page.locator('h3 a').first().click();
//     await expect(page).toHaveTitle("Question Answer Options Create");

//     const questionAOs = ['groceries are not real', 'anime is real', 'animals are not real', 'vehicles are real', 'weapons are not real', 'sweets are real', "power tools are not real"];

//     for (const questionAO of questionAOs){
//         //try to create topic
//         await page.locator("textarea").type(questionAO);
//         await page.locator("input[type=checkbox]").click();
//         await page.locator("button.btn.btn-primary").click();
//         await expect(page).toHaveTitle("Question Answer Options Create");
//     }

//     for (let i = 0; i < questionAOs.length; i++){
//         //try to delete question answer option
//         await page.locator("button.btn.btn-danger").nth(0).click();
//         await expect(page).toHaveTitle("Question Answer Options Create");
//     }

//     await page.locator("button.btn.btn-danger:has-text('Delete question')").click();
//     await expect(page).toHaveTitle("Questions Create");
// });