import * as userService from "../../services/userService.js";
import * as topicsService from "../../services/topicsService.js";
import * as validateService from "../../services/validateService.js";
import { validasaur } from "../../deps.js";


const showTopics = async ({ render, state}) => {
  // const admin = await userService.getAdmin();
  // await state.session.set("user", admin[0]);
  const topics = {topics: await topicsService.getTopics()};
  render("topics.eta", topics);
};

const postAddTopicForm = async ({request, response, render, user}) =>{
      if (user.admin){
        const body = request.body();
        const params = await body.value;
      
        const topic = params.get('name').toLowerCase();
      
      
        let [passes, errors] = await validasaur.validate({topic: topic}, {topic: [validasaur.minLength(1),validasaur.required]});
        
        if(await validateService.topicExistsByName(topic)){
          errors.topic = {topicExists: "topic exists already"};
          passes = false;
        }

        if(!passes){
          render("topics.eta", {name: topic, errors: errors, topics: await topicsService.getTopics()});
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
