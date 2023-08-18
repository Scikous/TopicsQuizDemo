import * as userService from "../../services/userService.js";

const dummyData = {
    topics: [
      { name: "zxs 1", id: 1 },
      { name: "abs 2", id: 2 },
      { name: "dac 3", id: 3 },
      // Add more topics as needed
    ]
  };
  const showTopics = async ({ render }) => {
    const admin = await userService.getAdmin();
    console.log(admin);
    dummyData["admin"] = false //admin[0].admin;
    render("topics.eta", dummyData);
  };

  const showTopic = ({ render }) => {
  
    render("topic.eta");
  };
  
  export { showTopics, showTopic };
  