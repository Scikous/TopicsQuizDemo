import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";


const getData = async(params, request) => {
    const topicID = Number(params.id);
    const questionID = Number(params.qID);
    
    const data = {
      topicID: topicID,
      questionID: questionID,
      question: await questionsService.getTopicQuestionByID(questionID),
      errors: {},
    }
  
    if(request){
      const body = request.body();
      const params = await body.value;
      data.question_text = params.get("question_text");
    }
    return data;
  };

const showQuestion = async ({render, params}) =>{
  const questionData = await getData(params);
  console.log(questionData);
  render("questionAnswerOptions.eta", {question_text: "fsfsd", errors: {}});
};

export {showQuestion};