import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from"./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAOController from "./controllers/questionAnswerOptionsController.js";
import * as quizController from "./controllers/quizController.js";
const router = new Router();

router.get("/", mainController.showMain);


//registration routing
router.get("/auth/register", registrationController.showRegistrationForm)
    .post("/auth/register", registrationController.postRegistrationForm);

//login routing
router.get("/auth/login", loginController.showLoginForm)
    .post("/auth/login", loginController.postLoginForm);

//topics routing
router.get("/topics", topicsController.showTopics)
    .post("/topics", topicsController.postAddTopicForm);
router.post("/topics/:id/delete", topicsController.postdeleteTopicByIDForm)

//questions routing
router.get("/topics/:id", questionsController.showTopicQuestions)
    .post("/topics/:id/questions", questionsController.postAddQuestionForm);
router.post("/topics/:id/questions/:qID/delete", questionsController.postDeleteQuestionForm);

//questionAnswerOptions routing
router.get("/topics/:id/questions/:qID", questionAOController.showQuestion);
router.post("/topics/:id/questions/:qID/options", questionAOController.postAddQuestionAOForm);
router.post("/topics/:id/questions/:qID/options/:oID/delete", questionAOController.postDeleteQuestionAOForm);
//quiz routing
router.get("/quiz", quizController.showQuiz);
router.get("/quiz/:id", quizController.showQuizRandQuestion);
router.get("/quiz/:id/questions/:qID", quizController.showQuiz);



export { router };
