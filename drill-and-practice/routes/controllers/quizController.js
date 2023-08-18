const dummyData = {
    topics: [
      { name: "zxs 1", id: 1 },
      { name: "abs 2", id: 2 },
      { name: "dac 3", id: 3 },
      // Add more topics as needed
    ]
  };
  const showQuiz = ({ render }) => {
  
    render("quiz.eta", dummyData);
  };
  
  export { showQuiz };
  