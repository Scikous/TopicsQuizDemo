import {sql} from "../database/database.js";

const getAdmin = async () =>{ //delete later
    return await sql`SELECT * FROM users WHERE admin=TRUE`;
};


export {getAdmin};