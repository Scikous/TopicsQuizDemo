import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from"./controllers/registrationController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAnswerOptionsController from "./controllers/questionAnswerOptionsController.js";
import * as quizController from "./controllers/quizController.js";
const router = new Router();

router.get("/", mainController.showMain);


//registration routing
router.get("/auth/register", registrationController.showRegistrationForm)
    .post("/auth/register", registrationController.postRegistrationForm);

//topics routing
router.get("/topics", topicsController.showTopics)
    .post("/topics", topicsController.postAddTopicForm);
router.post("/topics/:id/delete", topicsController.postdeleteTopicByIDForm)

//questions routing
router.get("/topics/:id", questionsController.showTopicQuestions)
    .post("/topics/:id/questions", questionsController.postAddQuestionForm);

//questionAnswerOptions routing
router.get("/topics/:id/questions/:qID", questionAnswerOptionsController.showQuestion)
router.post("/topics/:id/questions/:qID/options", questionAnswerOptionsController.postAddQuestionAOForm);

//quiz routing
router.get("/quiz", quizController.showQuiz);



export { router };
