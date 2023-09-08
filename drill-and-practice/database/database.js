import { postgres } from "../deps.js";
import { config } from "../config/localConfig.ts";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  if(Deno.env.get("ENVIRONMENT") === "local"){
    sql = postgres(config.database);
  }else{
    sql = postgres({});
  }
}

export { sql };
