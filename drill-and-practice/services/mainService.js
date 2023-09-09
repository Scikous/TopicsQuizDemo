import { sql } from "../database/database.js";

const getTopicsCount = async () => {
  const rows = await sql`SELECT COUNT(*) FROM topics`;
  const topicsCount = rows[0].count;
  return topicsCount;
};

const getQuestionsCount = async () => {
  const rows = await sql`SELECT COUNT(*) FROM questions`;
  const questionsCount = rows[0].count;
  return questionsCount;
};
const getAnswersCount = async () => {
  const rows = await sql`SELECT COUNT(*) FROM question_answers`;
  const answersCount = rows[0].count;
  return answersCount;
};

const getLeaderboard = async () =>{
  return await sql`SELECT
  u.id AS user_id,
  SUBSTRING(u.email FROM 1 FOR POSITION('@' IN u.email)-1) AS name,
  COUNT(*) AS correct_answer_count
FROM
  users u
JOIN
  question_answers qa ON u.id = qa.user_id
JOIN
  question_answer_options qao ON qa.question_answer_option_id = qao.id
WHERE
  qao.is_correct = TRUE
GROUP BY
  u.id, u.email
ORDER BY
  correct_answer_count DESC
LIMIT 10;
`;

};

export {
  getTopicsCount,
  getQuestionsCount,
  getAnswersCount,
  getLeaderboard,
};
