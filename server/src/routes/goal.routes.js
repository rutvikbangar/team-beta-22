import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createGoal } from "../controllers/goal.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createGoal);


export default router


