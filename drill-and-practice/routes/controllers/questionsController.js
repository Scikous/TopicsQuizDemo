import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";
import * as questionsService from "../../services/questionsService.js";
import * as validateService from "../../services/validateService.js";

const getData = async (params, request) => {
  const topicID = Number(params.id);

  const data = {
    topicID: topicID,
    topic: await topicsService.getTopicNameByID(topicID),
    questions: await questionsService.getQuestionsByTopicID(topicID),
    question_text: "",
    errors: {},
  };

  if (request) {
    const body = request.body({ type: "form" });
    const formParams = await body.value;
    data.question_text = formParams.get("question_text");
  }
  return data;
};

const showTopicQuestions = async ({ render, request, params, state }) => {
  const questionData = await getData(params);
  render("creation/questions.eta", questionData);
};

const postAddQuestionForm = async ({response, request, render, params, user,
}) => {
  if (user) {
    const questionData = await getData(params, request);

    let [passes, errors] = await validasaur.validate({ question_text: questionData.question_text }, { question_text: [validasaur.minLength(1), validasaur.required] });

    if (await validateService.questionExistsByName(questionData.question_text, questionData.topicID)) {
      errors.question = { Exists: "Question exists already" };
      passes = false;
    }

    if (!passes) {
      questionData.errors = errors;
      response.status = 400;
      render("creation/questions.eta", questionData);
    } else {
      await questionsService.addQuestion(user.id, questionData.topicID, questionData.question_text);
      response.redirect(`/topics/${questionData.topicID}`);
    }
  }else{
    response.status = 401;
  }
};

const postDeleteQuestionForm = async ({ response, params, user }) => {
  if (user) {
    const topicID = params.id;
    const questionID = params.qID;
    await questionsService.deleteQuestionByID(questionID, user.id, topicID);
    response.redirect(`/topics/${topicID}`);
  }else{
    response.status = 401;

  }
};

export {
  postAddQuestionForm,
  showTopicQuestions,
  postDeleteQuestionForm,
};
