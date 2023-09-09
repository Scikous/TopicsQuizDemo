import { app } from "../../../app.js";
import { superoak, assertEquals ,assertMatch } from "../../../deps.js";



//Expect registration error
Deno.test({name: "Expect 7 registraton errors",sanitizeResources: false, sanitizeOps: false,}, async () => {
    const testClient = await superoak(app);
    const response = await testClient.post("/auth/register")
        .send("email=admin@admin.com&password=123&verification=279")
        .expect(400);
    await assertMatch(response.text, new RegExp("User exists already"));
    await assertMatch(response.text, new RegExp("Password and verification do not match"));

    const testClient2 = await superoak(app);
    const response2 = await testClient2.post("/auth/register")
        .send("email=&password=&verification=")
        .expect(400);

    await assertMatch(response2.text, new RegExp("Email must be between 4-255 characters long"));
    await assertMatch(response2.text, new RegExp("Email is required"));
    await assertMatch(response2.text, new RegExp("Email is invalid"));

    await assertMatch(response2.text, new RegExp("Password must be between 4-60 characters long"));
    await assertMatch(response2.text, new RegExp("Password is required"));
});

//login error test
Deno.test({name: "Expect error: 'Either email address or password is incorrect'",sanitizeResources: false, sanitizeOps: false,}, async () => {
    const testClient = await superoak(app);
    const response = await testClient.post("/auth/login")
        .send("email=user@user&password=pss")
        .expect(400);
    await assertMatch(response.text, new RegExp("Either email or password is incorrect"));
});

