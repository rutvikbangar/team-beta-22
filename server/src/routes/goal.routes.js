import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { completeTask, createGoal, deleteGoal, getactiveGoal, goalHistory } from "../controllers/goal.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createGoal).get(getactiveGoal);

router.route("/:goalId/:taskId").post(completeTask);

router.route("/dl/:goalId").delete(deleteGoal);

router.route("/history").get(goalHistory);




export default router


