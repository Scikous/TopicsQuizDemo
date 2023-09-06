import * as topicsService from "../../services/topicsService.js";
import * as validateService from "../../services/validateService.js";
import { validasaur } from "../../deps.js";

const showTopics = async ({ render }) => {
  const topics = { topics: await topicsService.getTopics() };
  render("creation/topics.eta", topics);
};

const postAddTopicForm = async ({ request, response, render, user }) => {
  if (user.admin) {
    const body = request.body({ type: "form"});
    const formParams = await body.value;

    const topic = formParams.get("name");
    let [passes, errors] = await validasaur.validate({ topic: topic }, { topic: [validasaur.lengthBetween(1, 255), validasaur.required] },
    );

    if (await validateService.topicExistsByName(topic)) {
      errors.topic = { topicExists: "Topic exists already" };
      passes = false;
    }

    if (!passes) {
      response.status = 400;
      render("creation/topics.eta", {name: topic, errors: errors, topics: await topicsService.getTopics(),});
    } else {
      await topicsService.addTopic(user.id, topic);
      response.redirect("/topics");
    }
  }else{
    response.status = 401;
  }
};

const postdeleteTopicByIDForm = async ({response, user, params}) => {
  if (user.admin) {
    const topicID = params.id;
    await topicsService.deleteTopicByID(topicID, user.id);
    response.redirect("/topics");
  }else{
    response.status = 401;
  }
};

export {
  showTopics,
  postAddTopicForm,
  postdeleteTopicByIDForm,
};
