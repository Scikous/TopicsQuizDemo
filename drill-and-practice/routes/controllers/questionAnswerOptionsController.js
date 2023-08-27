import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAOService from "../../services/questionAnswerOptionsService.js";

const getData = async(params, request) => {
    const topicID = Number(params.id);
    const questionID = Number(params.qID);
    const question = await questionsService.getQuestionByID(questionID);
  
    const data = {
      topicID: topicID,
      questionID: questionID,
      question_text: question.question_text,
      option_text: "",
      is_correct: false,
      question_answer_options: await questionAOService.getQuestionAOsByID(questionID),
      errors: {},
    }
  
    if(request){
      const body = request.body();
      const formParams = await body.value;
      data.option_text = formParams.get("option_text");
      if(formParams.get("is_correct")){
        data.is_correct = Boolean(formParams.get("is_correct"));
      }
    }
    return data;
  };

const showQuestion = async ({render, params, state}) =>{

  const questionAOData = await getData(params);
  const admin = await userService.getAdmin();
  await state.session.set("user", admin[0]);
  render("questionAnswerOptions.eta", questionAOData);
};

const postAddQuestionAOForm = async ({response, request, render, params, user}) =>{
  if(user){
    const questionAOData = await getData(params, request);

    const [passes, errors] = await validasaur.validate({option_text: questionAOData.option_text}, {option_text: [validasaur.minLength(1),validasaur.required]});

    if(!passes){
      questionAOData.errors = errors; //AO=Answer Option
      render("questionAnswerOptions.eta", questionAOData);
    }else{
      await questionAOService.addQuestionAO(questionAOData.questionID, questionAOData.option_text, questionAOData.is_correct);
      response.redirect(`/topics/${questionAOData.topicID}/questions/${questionAOData.questionID}`);
    }
  }
};

const postDeleteQuestionAOForm = async ({response, params, request, user})=>{
  if(user && user.admin){
    const questionAO_ID = Number(params.oID);

    const questionAOData = await getData(params, request);

    await questionAOService.deleteQuestionAO(questionAO_ID, questionAOData.questionID);
    response.redirect(`/topics/${questionAOData.topicID}/questions/${questionAOData.questionID}`);
  }

};




export {showQuestion, postAddQuestionAOForm, postDeleteQuestionAOForm};