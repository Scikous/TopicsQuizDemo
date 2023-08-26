import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";


const quizRandQuestionGet = async ({response}) =>{
    const randomQuestion = await quizService.getRandQuestionAsJSON();
    const randomQuestionJSON = JSON.stringify(randomQuestion);

    response.body = randomQuestionJSON;
  };

  const quizPostQuestionAnswer = async ({response, request}) =>{
    const body = request.body({type: "json"});
    const params = await body.value;

    const questionID = Number(params.questionId);
    const optionID = Number(params.optionId);

    if(questionID && optionID){
        console.log(questionID, optionID);
        const isCorrect = await quizService.getAnswerTFValue(optionID, questionID);
        response.body = {"correct": isCorrect};
    }else{
        response.body = "questionId and optionId were not received";
    }
  };

  export {quizRandQuestionGet, quizPostQuestionAnswer};