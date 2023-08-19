import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as quizController from "./controllers/quizController.js";
const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.showTopics)
    .post("/topics", topicsController.postTopicForm);

router.get("/topics/:id", topicsController.showTopic);
router.get("/quiz", quizController.showQuiz);


export { router };
