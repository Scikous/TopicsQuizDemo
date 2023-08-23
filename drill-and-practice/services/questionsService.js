import { sql } from "../database/database.js";

const addQuestion = async (userID,topicID, question) =>{
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userID}, ${topicID}, ${question})`;

};

const getTopicQuestionByID = async (questionID) =>{
    return await sql`SELECT * FROM questions WHERE id=${questionID}`;
}

const getTopicQuestionsByID = async (topicID) =>{
    return await sql`SELECT * FROM questions WHERE topic_id=${topicID}`;
};
const deleteTopicQuestionByID = async (userID,questionID) =>{//users can only delete their own questions
    await sql`DELETE FROM questions WHERE user_id=${userID} AND question_id=${questionID}`;
}

export {addQuestion, getTopicQuestionsByID, deleteTopicQuestionByID, getTopicQuestionByID};