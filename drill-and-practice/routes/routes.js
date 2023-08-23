import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionAnswerOptionsController from "./controllers/questionAnswerOptionsController.js";
const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.showTopics)
    .post("/topics", topicsController.postAddTopicForm);
router.post("/topics/:id/delete", topicsController.postdeleteTopicByIDForm)

router.get("/topics/:id", questionsController.showTopicQuestions)
    .post("/topics/:id/questions", questionsController.postAddQuestionForm);
router.get("/topics/:id/questions/:qID", questionAnswerOptionsController.showQuestion);

router.get("/quiz", quizController.showQuiz);


export { router };
