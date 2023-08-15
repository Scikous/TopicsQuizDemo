const dummyData = {
  topicsCount: 1,
  questionsCount: 0,
  answersCount: 0,
}
const showMain = ({ render }) => {

  render("main.eta", dummyData);
};

export { showMain };
