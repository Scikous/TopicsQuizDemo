import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";
import {topicExists} from "../../services/validateService.js";

const dummyData = {
    topics: [
      { name: "zxs 1", id: 1 },
      { name: "abs 2", id: 2 },
      { name: "dac 3", id: 3 },
      // Add more topics as needed
    ]
  };
const showTopics = async ({ render, state }) => {
  const admin = await userService.getAdmin();
  await state.session.set("user", admin[0]);

  render("topics.eta", dummyData);
};

const postTopicForm = async ({request, response, render, user}) =>{

  try{
    if (user.admin){
      const body = request.body();
      const params = await body.value;
    
      const topic = params.get('name');
    
    
      const exists = await topicExists(topic);
      const [passes, errors] = await validasaur.validate({topic: topic}, {topic: [validasaur.minLength(1),validasaur.required]});
      if(!passes || exists){
        if(exists){
          errors.topic = {topic: "topic already exists"};
        }
        render("topics.eta", {name: topic, errors: errors, topics: dummyData.topics});
      } else{
        await topicsService.addTopic(user.id, topic);
        response.redirect("/topics");
      }
    
    }
  } catch (e) {
    console.log("User is not logged in or is not admin");
    response.redirect("/topics");
  }

}; 

const showTopic = async ({ render, state }) => {
  render("topic.eta");
};

export { showTopics, showTopic, postTopicForm };
