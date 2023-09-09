import * as quizService from "../../services/quizService.js";

const quizRandQuestionGet = async ({ response }) => {
  const randomQuestion = await quizService.getRandQuestionAsJSON();
  if(randomQuestion){
    const randomQuestionJSON = JSON.stringify(randomQuestion);
    
    response.status = 200;
    response.headers.set("Content-Type", "application/json"); // Set the correct Content-Type header
    response.body = randomQuestionJSON;
  }else{
    response.status = 404;
    response.body = "No questions found";
  }
};

const quizPostQuestionAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const paramsJSON = await body.value;

  const keys = Object.keys(paramsJSON);
  const questionID = Number(paramsJSON.questionId);
  const optionID = Number(paramsJSON.optionId);

  if (keys[0] === "questionId" && keys[1] === "optionId"
      && questionID && optionID) {
    const isCorrect = await quizService.getAnswerTFValue(optionID, questionID);
    if(isCorrect !== null){
      response.status = 200;
      response.headers.set("Content-Type", "application/json"); // Set the correct Content-Type header
      response.body = { "correct": isCorrect };
    }else{
      response.status = 404;
      response.body = "Question or answer option does not exist";
    }
  } else {
    response.status = 400;
    response.body = "questionId and optionId were not received";
  }
};
export { quizRandQuestionGet, quizPostQuestionAnswer };
