import {sql} from "../database/database.js";

const topicExistsByName = async (topic) => {
    try{
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM users WHERE name=${topic})`;
        return exists[0].exists;
    }catch(e){
        console.log("No topics yet");
        return false;
    }
};

const topicExistsByID = async (topicID) => {
    try {
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM users WHERE id=${topicID})`;
        return exists[0].exists;
    }catch(e){
        console.log("No topics yet");
        return false;
    }
};

const userExists = async (email) =>{
    try{
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM users WHERE email=${email})`;
        return exists[0].exists;
    }catch(e){
        console.log("No users exist yet");
        return false;
    }
};
export {topicExistsByName, topicExistsByID, userExists};