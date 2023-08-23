import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as validateService from "../../services/validateService.js";
import { validasaur } from "../../deps.js";

const dummyData = {
    topics: [
      { name: "zxs 1", id: 1 },
      { name: "abs 2", id: 2 },
      { name: "dac 3", id: 3 },
      // Add more topics as needed
    ]
  };
const showTopics = async ({ render, state}) => {
  const admin = await userService.getAdmin();
  await state.session.set("user", admin[0]);
  const topics = {topics: await topicsService.getTopics()};
  render("topics.eta", topics);
};

const postAddTopicForm = async ({request, response, render, user}) =>{
      if (user.admin){
        const body = request.body();
        const params = await body.value;
      
        const topic = params.get('name').toLowerCase();
      
      
        const exists = await validateService.topicExistsByName(topic);
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
}; 


const postdeleteTopicByIDForm = async ({request, response, render, user, params}) =>{
  if (user.admin){
      const topicID = params.id;
      await topicsService.deleteTopicByID(topicID, user.id);
      response.redirect("/topics");    
    }
}; 


export { showTopics, postAddTopicForm, postdeleteTopicByIDForm };
