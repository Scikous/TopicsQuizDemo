import {sql} from "../database/database.js";

const getAdmin = async () =>{ //delete later
    return await sql`SELECT * FROM users WHERE admin=TRUE`;
};

const getUserByEmail = async (email) =>{ 
    return await sql`SELECT * FROM users WHERE email=${email}`;
};



const addUser = async (email, encryptedPass) =>{
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${encryptedPass})`;
}

export {getAdmin, getUserByEmail, addUser};