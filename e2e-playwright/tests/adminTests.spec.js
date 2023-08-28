const { test, expect } = require("@playwright/test");
const {adminLogin} = require("../utils/testUtils.js");
//test for admin



test("Login admin test", async ({ page }) => {
    await adminLogin({page});
    await expect(page).toHaveTitle("Topics Create");
});


test("Topics Create page has expected admin add and delete functionality", async ({ page }) => {
    await adminLogin({page});
    await expect(page).toHaveTitle("Topics Create");

    const topics = ['groceries', 'anime', 'animals', 'vehicles', 'weapons', 'sweets', "power tools"];

    for (const topic of topics){
        //try to create topic
        await page.locator("input[type=text]").type(topic);
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Topics Create");
    }


    for (let i = 0; i < 5; i++){
        //try to delete topic
        await page.locator("button.btn.btn-danger").nth(0).click();
        await expect(page).toHaveTitle("Topics Create");
    }
    //test if a link works
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");
});



test("Questions Create page has expected admin add and delete functionality", async ({ page }) => {
    await adminLogin({page});
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");

    const questions = ['groceries are real?', 'anime is real?', 'animals are real?', 'vehicles are real?', 'weapons are real?', 'sweets are real?', "power tools are real?"];

    for (const question of questions){
        //try to create topic
        await page.locator("textarea").type(question);
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Questions Create");
    }



    for (let i = 0; i < 6; i++){
        //try to delete topic
        await page.locator("button.btn.btn-danger").nth(0).click();
        await expect(page).toHaveTitle("Questions Create");
    }
    // test if a link works
     await page.locator('h3 a').first().click();
     await expect(page).toHaveTitle("Question Answer Option Create");
});



test("Question Answer Option Create page has expected admin add and delete functionality", async ({ page }) => {
    await adminLogin({page});
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Questions Create");
    await page.locator('h3 a').first().click();
    await expect(page).toHaveTitle("Question Answer Option Create");

    const questionAOs = ['groceries are real', 'anime is real', 'animals are real', 'vehicles are real', 'weapons are real', 'sweets are real', "power tools are real"];

    for (const questionAO of questionAOs){
        //try to create topic
        await page.locator("textarea").type(questionAO);
        await page.locator("button.btn.btn-primary").click();
        await expect(page).toHaveTitle("Question Answer Option Create");
    }



    for (let i = 0; i < 6; i++){
        //try to delete question answer option
        await page.locator("button.btn.btn-danger").nth(0).click();
        await expect(page).toHaveTitle("Question Answer Option Create");
    }
});
