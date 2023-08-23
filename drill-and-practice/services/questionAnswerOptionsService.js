import { sql } from "../database/database.js";

const addQuestionAO = async (questionID, option_text, is_correct) =>{
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionID}, ${option_text}, ${is_correct})`;
};

const getQuestionAOsByID = async (questionID) =>{
    return await sql`SELECT * FROM question_answer_options WHERE question_id=${questionID}`;
};

export {addQuestionAO, getQuestionAOsByID};