import { postgres } from "../deps.js";
import { config } from "../config/testingConfig.ts";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
    sql = postgres({});
}

export { sql };
