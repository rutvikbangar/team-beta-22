import {Router} from "express"
// import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createAward } from "../controllers/award.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/").post(upload.single("awardurl"),createAward);


export default router