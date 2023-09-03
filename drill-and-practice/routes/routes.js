import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from"./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAOController from "./controllers/questionAnswerOptionsController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizApi from "./apis/quizApi.js";
import * as sessionApi from "./apis/sessionApi.js";


const router = new Router();

router.get("/", mainController.showMain);


//registration routing
router.get("/auth/register", registrationController.showRegistrationForm)
    .post("/auth/register", registrationController.postRegistrationForm);
router.get("/auth/register/success", registrationController.showRegistrationSuccess);

//login routing
router.get("/auth/login", loginController.showLoginForm)
    .post("/auth/login", loginController.postLoginForm);
router.get("/auth/logout", loginController.postUserLogout);
//session API routes
router.get("/api/logout", sessionApi.sessionIdleCheck);//automatic logout


//topics routing
router.get("/topics", topicsController.showTopics)
    .post("/topics", topicsController.postAddTopicForm);
router.post("/topics/:id/delete", topicsController.postdeleteTopicByIDForm);

//questions routing
router.get("/topics/:id", questionsController.showTopicQuestions);
    router.post("/topics/:id/questions", questionsController.postAddQuestionForm);
router.post("/topics/:id/questions/:qID/delete", questionsController.postDeleteQuestionForm);

//questionAnswerOptions routing
router.get("/topics/:id/questions/:qID", questionAOController.showQuestion);
router.post("/topics/:id/questions/:qID/options", questionAOController.postAddQuestionAOForm);
router.post("/topics/:id/questions/:qID/options/:oID/delete", questionAOController.postDeleteQuestionAOForm);
//quiz routing
router.get("/quiz", quizController.showQuiz);
router.get("/quiz/:id", quizController.quizRandTopicQuestionGet);
router.get("/quiz/:id/questions/:qID", quizController.showQuizRandQuestion);
router.post("/quiz/:id/questions/:qID/options/:oID", quizController.quizUserAnswer);
router.get("/quiz/:id/questions/:qID/correct", quizController.showCorrectPage);
router.get("/quiz/:id/questions/:qID/incorrect", quizController.showIncorrectPage);

//quizApi routes
router.get("/api/questions/random", quizApi.quizRandQuestionGet);
router.post("/api/questions/answer", quizApi.quizPostQuestionAnswer);

export { router };
