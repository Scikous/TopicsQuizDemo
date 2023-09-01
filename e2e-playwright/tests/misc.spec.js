const { test, expect } = require("@playwright/test");
const {elementsGetter} = require("../utils/testUtils.js");


// test("Home page has expected statistics", async ({ page }) => {
//     await page.goto("/");
//     await expect(page).toHaveTitle("Topics Quiz");
//     await page.waitForSelector('h2');

//     const statisticsText = await elementsGetter({page}, 'h2');
//    // const topicsText = /Topics Quiz! [0-9]/;
//     const topicsPattern = /Number of topics: [0-9]/;
//     const questionsPattern = /Number of questions: [0-9]/;
//     const answersPattern = /Number of answers: [0-9]/;

//     for (const text of statisticsText){
//         expect(topicsPattern.test(text) || questionsPattern.test(text) || answersPattern.test(text)).toBe(true);
//     }
// });



// test("Registration page has expected functionality", async ({ page }) => {
//     await page.goto("/auth/register");
//     await expect(page).toHaveTitle("Registration");
  
//     await page.locator("input[type=email]").type("test@test.com");
//     await page.locator("input[id=password]").type("test");
//     await page.locator("input[id=verification]").type("test");

//     await page.locator("button.btn.btn-primary").click();
//     await expect(page).toHaveTitle("Login");
// });

