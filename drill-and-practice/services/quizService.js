import {sql} from "../database/database.js";

const getRandomQuestion = async (topicID) =>{
    return await sql`SELECT * FROM questions WHERE topic_id=${topicID} ORDER BY random() LIMIT 1`;
};

export {getRandomQuestion};