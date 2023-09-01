const { test, expect } = require("@playwright/test");
const {adminLogin, userLogin} = require("../utils/testUtils.js");
//test for user

test.beforeEach(async ({page}) => {
    await adminLogin({page});
    //upon succesful login user is automatically redirected to /topics
    await expect(page).toHaveTitle("Topics Create");
});

test("Create question with options for Quiz", async ({page}) =>{

    //try to create topic
    await page.locator("input[type=text]").type("animals");
    await page.locator("button.btn.btn-primary:has-text('Add')").click();
    await expect(page).toHaveTitle("Topics Create");

    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");

    const questions = ['groceries are real?', 'anime is real?']; 

    for (const question of questions){
        //try to create question
        await page.locator("textarea").type(question);
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Questions Create");
    }

    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Question Answer Options Create");

    await page.locator("textarea").type('groceries are not real');
    await page.locator("button.btn.btn-primary").click();
    await expect(page).toHaveTitle("Question Answer Options Create");

    await page.locator("textarea").type('anime is real');
    await page.locator("input[type=checkbox]").click();
    await page.locator("button.btn.btn-primary").click();
    await expect(page).toHaveTitle("Question Answer Options Create");

});



test("Quiz test", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page).toHaveTitle("Quiz Topics");

    await page.locator('h3 a').nth(0).click();
    await expect(page).toHaveTitle("Quiz Question");

    const choiceNum = Math.floor(Math.random() * 2);
    const chooseBtn = await page.locator("button.btn.btn-primary:has-text('Choose')");
    if(await chooseBtn.count() >= 1){
        console.log("Found orrect!");
        await page.locator("button.btn.btn-primary:has-text('Choose')").nth(choiceNum).click();
        await expect(page).toHaveTitle(/Quiz .*orrect/);
        await page.locator('a:has-text("Next question")').click();
        await expect(page).toHaveTitle("Quiz Question");
    }else{
        console.log("Found no options!");
        await expect(page).toHaveTitle("Quiz Question");
        await expect(page.locator('h3')).toHaveText('No answer options yet');
    }
});


test("Quiz has no questions", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page).toHaveTitle("Quiz Topics");

    await page.locator('h3 a').nth(1).click();
    await expect(page.locator('pre')).toHaveText("Oopsie, this topic doesn't have any questions yet");

});