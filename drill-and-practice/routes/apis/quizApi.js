import * as quizService from "../../services/quizService.js";

const quizRandQuestionGet = async ({ response }) => {
  const randomQuestion = await quizService.getRandQuestionAsJSON();
  const randomQuestionJSON = JSON.stringify(randomQuestion);
  
  response.status = 200;
  response.headers.set("Content-Type", "application/json"); // Set the correct Content-Type header
  response.body = randomQuestionJSON;
};

const quizPostQuestionAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;

  const questionID = Number(params.questionId);
  const optionID = Number(params.optionId);

  if (questionID && optionID) {
    const isCorrect = await quizService.getAnswerTFValue(optionID, questionID);
    response.status = 200;
    response.headers.set("Content-Type", "application/json"); // Set the correct Content-Type header
    response.body = { correct: isCorrect };
  } else {
    response.status = 400;
    response.body = "questionId and optionId were not received";
  }
};
export { quizRandQuestionGet, quizPostQuestionAnswer };
