import {sql} from "../database/database.js";

const topicExistsByName = async (topic) => {
    try{
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM topics WHERE name=${topic})`;
        return exists[0].exists;
    }catch(e){
        console.log("No topics yet");
        return false;
    }
};

const topicExistsByID = async (topicID) => {
    try {
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM topics WHERE id=${topicID})`;
        return exists[0].exists;
    }catch(e){
        console.log("No topics yet");
        return false;
    }
};


const questionExistsByName = async (question, topicID) => {
    try{
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM questions WHERE question_text=${question} AND topic_id=${topicID})`;
        return exists[0].exists;
    }catch(e){
        console.log("No questions yet");
        return false;
    }
};

const questionAOExistsByName = async (questionAO, questionID) => {
    try{
        const exists = await sql`SELECT EXISTS (SELECT 1 FROM question_answer_options WHERE option_text=${questionAO} AND question_id=${questionID})`;
        return exists[0].exists;
    }catch(e){
        console.log("No question answer options yet");
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
export {topicExistsByName, questionExistsByName, questionAOExistsByName, topicExistsByID, userExists};