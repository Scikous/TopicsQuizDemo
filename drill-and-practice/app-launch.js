import { app } from "./app.js";

// if (!Deno.env.get("TEST_ENVIRONMENT")) {
//     app.listen({ port: 7777 });
// }else{
//     app.listen({ port: 8888 });
// }
app.listen({ port: 7777 });
