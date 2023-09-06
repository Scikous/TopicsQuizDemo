import { app } from "../app.js";
import { superoak,assertAlmostEquals, assertEquals ,assertMatch, assertStringIncludes } from "../deps.js";


// Deno.test({name: "Expect error 'Either email address or password is incorrect'",sanitizeResources: false, sanitizeOps: false,}, async () => {
//     const testClient = await superoak(app, { port:7777 });
//     const response = await testClient.post("/auth/login")
//         .send("email=user@user&password=pss")
//         .expect(400);
//      await assertMatch(response.text, new RegExp("Either email or password is incorrect"));
// });

// Deno.test({name: "Expect questions",sanitizeResources: false, sanitizeOps: false,}, async () => {
//     const testClient = await superoak(app, { port:7777 });
//     await testClient.post("/auth/login")
//         .send("email=admin@admin.com&password=123456")
//         .expect(302)
//         .expect("Location", "/topics");

// });

Deno.test({name: "test2",sanitizeResources: false, sanitizeOps: false,}, async () => {
    const testClient = await superoak(app, { port:7777 });
    const response = await testClient.get("/api/questions/random")
        //.expect(200);
    const questionData = response.body;
    assertEquals(typeof questionData.questionId, "number");
    assertEquals(typeof questionData.questionText, "string");
    questionData.answerOptions.forEach((option) => {
      // Check for "any number" using a regular expression
      assertEquals(typeof option.optionId, "number");
      assertEquals(typeof option.optionText, "string");
    });
    // const regNum = new RegExp()
    // assertMatch(questionData.questionId, )
    // //assertEquals(questionData.questionId, )
    // console.log(questionData.questionId);

      const pattern = /^{"questionId":\s\d+,\s"questionText":\s".+",\s"answerOptions":\s\[[\s\{"optionId":\s\d+,\s"optionText":\s".+"\},\s]*\]}$/;
     //await assertMatch(response.json, new RegExp("Either email or password is incorrect"));
});