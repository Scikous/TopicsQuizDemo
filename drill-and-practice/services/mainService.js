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

export { getTopicsCount, getQuestionsCount, getAnswersCount };
