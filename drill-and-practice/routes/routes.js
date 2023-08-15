import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.showTopics);

export { router };
