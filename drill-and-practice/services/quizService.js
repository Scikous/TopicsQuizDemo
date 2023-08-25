import {sql} from "../database/database.js";

const getRandQuestionByTopicID = async (topicID) =>{
    return await sql`SELECT * FROM questions WHERE topic_id=${topicID} ORDER BY random() LIMIT 1`;
};

const getRandQuestionAsJSON = async () =>{
    const randQuestion = await sql`SELECT
    q.id AS "questionId",
    q.question_text AS "questionText",
    json_agg(json_build_object(
      'optionId', qao.id,
      'optionText', qao.option_text
    )) AS "answerOptions"
  FROM questions q
  JOIN question_answer_options qao ON q.id = qao.question_id
  GROUP BY q.id, q.question_text
  ORDER BY random() LIMIT 1`;
    return randQuestion[0];
};

const addUserAnswer = async (userID, questionID, questionAO_ID) =>{
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userID}, ${questionID}, ${questionAO_ID})`;
};

const getSelectedAnswer = async (questionAO_ID, questionID) =>{
    const answer = await sql`SELECT is_correct FROM question_answer_options WHERE id=${questionAO_ID} AND question_id=${questionID}`;
    return answer[0].is_correct;
};

const getCorrectAnswer = async (questionID) =>{
    const answerText = await sql`SELECT option_text FROM question_answer_options WHERE is_correct=true AND question_id=${questionID}`;
    return answerText[0].option_text;
};

export {getRandQuestionByTopicID, getCorrectAnswer, addUserAnswer, getSelectedAnswer, getRandQuestionAsJSON};