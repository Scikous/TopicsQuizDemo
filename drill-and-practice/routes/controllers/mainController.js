import * as mainService from "../../services/mainService.js";

const showMain = async ({ render }) => {
  const statsData = {
    topicsCount: await mainService.getTopicsCount(),
    questionsCount: await mainService.getQuestionsCount(),
    answersCount: await mainService.getAnswersCount(),
    leaderboard: await mainService.getLeaderboard(),
  };
  console.log(statsData.leaderboard)
  render("main.eta", statsData);
};

export { showMain };
