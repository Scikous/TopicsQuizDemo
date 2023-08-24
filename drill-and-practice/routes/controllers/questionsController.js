import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";

const getData = async(params, request) => {
  const topicID = Number(params.id);

  const data = {
    topicID: topicID,
    topic: await topicsService.getTopicNameByID(topicID),
    questions: await questionsService.getQuestionsByTopicID(topicID),
    question_text: "",
    errors: {},
  }

  if(request){
    const body = request.body();
    const formParams = await body.value;
    data.question_text = formParams.get("question_text");
  }
  return data;
};

const showTopicQuestions = async ({ render, request, params, state }) => {
  const topicData = await getData(params);

  const admin = await userService.getAdmin();
  await state.session.set("user", admin[0]);
  render("questions.eta", topicData);
};

const postAddQuestionForm = async({response, request, render, params, user}) =>{
  if(user){
    const topicData = await getData(params, request);
    
    const [passes, errors] = await validasaur.validate({question_text: topicData.question_text}, {question_text: [validasaur.minLength(1),validasaur.required]});
    
    if(!passes){
      topicData.errors = errors;
      render("questions.eta", topicData);
    }else{
      await questionsService.addQuestion(user.id, topicData.topicID, topicData.question_text);
      response.redirect(`/topics/${topicData.topicID}`);
    }
  }
};

const postDeleteQuestionForm = async ({response, params,user}) =>{
  if(user){
    const topicID = params.id;
    const questionID= params.qID;
    await questionsService.deleteQuestionByID(questionID, user.id, topicID);
    response.redirect(`/topics/${topicID}`);
  }
};

export {postAddQuestionForm, showTopicQuestions, postDeleteQuestionForm};