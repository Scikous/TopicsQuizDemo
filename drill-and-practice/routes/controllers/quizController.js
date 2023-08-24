import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";


const showQuiz = async ({ render, state}) => {
  const admin = await userService.getAdmin();
  await state.session.set("user", admin[0]);
  const topics = {topics: await topicsService.getTopics()};
  render("quiz.eta", topics);
};

const showQuizRandQuestion = async ({ response, request, params ,state}) =>{
  const topicID = params.id;
  const randomQuestion = await quizService.getRandomQuestion(topicID);
  if(randomQuestion.length === 0){
    response.status = 404;
    response.body = "Oopsie, this topic doesn't have any questions yet";
  }else{
    const questionID = randomQuestion[0].id;
    response.redirect(`/quiz/${topicID}/questions/${questionID}`);
  }
};

  export { showQuiz, showQuizRandQuestion };
  