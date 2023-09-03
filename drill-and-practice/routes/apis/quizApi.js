import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";
import { postUserLogout } from "../controllers/loginController.js";

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
        const isCorrect = await quizService.getAnswerTFValue(optionID, questionID);
        response.body = {"correct": isCorrect};
    }else{
        response.body = "questionId and optionId were not received";
    }
  };

  const test = async ({response, state, user}) =>{
    console.log(user);
    if(user){
      const sessionExpire = await state.session.get("sessionExpire");
      const curTime = new Date().getTime();
      const maxInterval = 5000;
  
      //console.log(curTime-sessionExpire);
      if(curTime-sessionExpire > maxInterval){
        await state.session.set("user", null);
        await state.session.set("sessionExpire", null);

        response.body = {"expired": "true"};
        console.log("Expired");

      }else{
        response.body = {"expired": "false"};
        console.log("Expired");
      }
      //setInterval(() => {console.log(response.writable)}, 5000);
    }else{
      response.body = {"user" : "null"};
    }
  };

  export {quizRandQuestionGet, quizPostQuestionAnswer, test};