import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()

router.route("/register").post(
    upload.single("profilepicture"),registerUser
);

router.route("/login").post(
    loginUser
);

router.route("/logout").post(verifyJWT,logoutUser);


export default router