import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";


const quizRandQuestionGet = async ({response}) =>{
    const randomQuestion = await quizService.getRandQuestionAsJSON();
    const randomQuestionObj = {};
    const randomQuestionJSON = JSON.stringify(randomQuestion);

    response.body = randomQuestionJSON;
    console.log(await response.json());
  };

  export {quizRandQuestionGet};