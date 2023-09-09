import { app } from "./app.js";

if(Deno.env.get("ENVIRONMENT") === "local"){
    app.listen({ port: 8888 });
}else{
    app.listen({ port: 7777 });
}