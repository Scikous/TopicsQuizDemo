import { app } from "../app.js";
import { superoak, assertEquals ,assertMatch } from "../deps.js";


/*Uncomment if questions and question answer options exist in database */
// //api rand question get test
// Deno.test({name: "Expect question as JSON object",sanitizeResources: false, sanitizeOps: false,}, async () => {
//     const testClient = await superoak(app);
//     const response = await testClient.get("/api/questions/random")
//         .expect(200)
//         .expect("Content-Type", new RegExp("application/json"));
//     const questionData = response.body;
//     await assertEquals(typeof questionData.questionId, "number");
//     await assertEquals(typeof questionData.questionText, "string");
//     questionData.answerOptions.forEach(async (option) => {//check all AOs
//         await assertEquals(typeof option.optionId, "number");
//         await  assertEquals(typeof option.optionText, "string");
//     });
// });


// //api answer option for question is true/false
// Deno.test({name: 'Expect answer as JSON object: {"correct": <true/false>}',sanitizeResources: false, sanitizeOps: false,}, async () => {
//     const testClient = await superoak(app);
//     const response = await testClient.post("/api/questions/answer")
//         .send('{"questionId": 1, "optionId": 1}')
//         .expect(200)
//         .expect("Content-Type", new RegExp("application/json"));
//     await assertEquals(typeof response.body.correct, "boolean");
// });


//api answer and question errors
Deno.test({name: 'Expect answer to have 404 and 400 status, question to have 400}',sanitizeResources: false, sanitizeOps: false,}, async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer")
        .send('{"questionId": 9999, "optionId": 9999}')
        .expect(404)
        .expect("Question or answer option does not exist");

        const testClient2 = await superoak(app);
        await testClient2.post("/api/questions/answer")
        .send('{"Random":1, "Question":1}')
        .expect(400)
        .expect("questionId and optionId were not received");
    
        const testClient3 = await superoak(app);
        await testClient3.get("/api/questions/random")
        .expect(404)
        .expect("No questions found");
});
