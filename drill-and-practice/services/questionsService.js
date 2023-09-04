import { sql } from "../database/database.js";

const addQuestion = async (userID, topicID, question) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userID}, ${topicID}, ${question})`;
};

const getQuestionByID = async (questionID) => {
  const question = await sql`SELECT * FROM questions WHERE id=${questionID}`;
  return question[0];
};

const getQuestionsByTopicID = async (topicID) => {
  return await sql`SELECT * FROM questions WHERE topic_id=${topicID}`;
};
const deleteQuestionByID = async (questionID, userID, topicID) => {
  //users can only delete their own questions
  await sql`DELETE FROM questions WHERE id=${questionID} AND user_id=${userID} AND topic_id=${topicID}`;
};

export { addQuestion, getQuestionsByTopicID, deleteQuestionByID, getQuestionByID, };
