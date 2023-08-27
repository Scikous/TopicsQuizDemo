import * as mainService from "../../services/mainService.js";


const dummyData = {
  topicsCount: 1,
  questionsCount: 0,
  answersCount: 0,
}
const showMain = async ({ render }) => {
  const statsData = {topicsCount: await mainService.getTopicsCount(),
                      questionsCount: await mainService.getQuestionsCount(),
                      answersCount: await mainService.getAnswersCount()};
  render("main.eta", statsData);
};

export { showMain };
