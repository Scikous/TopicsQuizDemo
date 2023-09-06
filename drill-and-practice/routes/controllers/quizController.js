import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";

const showQuiz = async ({ render }) => {
  const topics = { topics: await topicsService.getTopics() };
  render("quiz/quiz.eta", topics);
};

const showQuizRandQuestion = async ({ render, params }) => {
  const questionID = params.qID;
  const question = await questionsService.getQuestionByID(questionID);
  const questionAOs = await questionAOService.getQuestionAOsByID(questionID);
  render("quiz/quizQuestion.eta", { question: question, questionAOs: questionAOs });
};

const showCorrectPage = async ({ render, params }) => {
  render("quiz/quizCorrect.eta", { topicID: params.id });
};

const showIncorrectPage = async ({ render, params }) => {
  const questionID = params.qID;
  const questionAOText = await quizService.getCorrectAnswer(questionID);

  render("quiz/quizIncorrect.eta", {topicID: params.id, correct_option_text: questionAOText,});
};

const quizRandTopicQuestionGet = async ({ response, params }) => {
  const topicID = params.id;
  const randomQuestion = await quizService.getRandQuestionByTopicID(topicID);
  
  if (randomQuestion.length === 0) {
    response.status = 404;
    response.body = "Oopsie, this topic doesn't have any questions yet";
  } else {
    const questionID = randomQuestion[0].id;
    response.redirect(`/quiz/${topicID}/questions/${questionID}`, randomQuestion);
  }
};

const quizUserAnswer = async ({ response, params, user }) => {
  if (user){
    const topicID = params.id;
    const questionID = params.qID;
    const questionAO_ID = params.oID;

    await quizService.addUserAnswer(user.id, questionID, questionAO_ID);

    const isCorrect = await quizService.getAnswerTFValue(questionAO_ID, questionID);
    if (isCorrect) {
      response.redirect(`/quiz/${topicID}/questions/${questionID}/correct`);
    } else {
      response.redirect(`/quiz/${topicID}/questions/${questionID}/incorrect`);
    }
  }else{
    response.status = 401;
  }
};

export {
  showQuiz,
  showQuizRandQuestion,
  quizRandTopicQuestionGet,
  quizUserAnswer,
  showCorrectPage,
  showIncorrectPage,
};
