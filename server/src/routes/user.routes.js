import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { displaynotBuyedAward, displayUserAward, loginUser, logoutUser, registerUser,buyAward, displayPetaward, assignPet, getcurrentUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()


router.route("/").get(verifyJWT,getcurrentUser);

router.route("/register").post(
    upload.single("profilepicture"),registerUser
);

router.route("/login").post(
    loginUser
);

router.route("/logout").post(verifyJWT,logoutUser);

router.route("/assign-pet/:petId").post(verifyJWT,assignPet);

router.route("/awards/brought").get(verifyJWT,displayUserAward);
router.route("/awards/not-brought").get(verifyJWT,displaynotBuyedAward);
router.route("/awards/:awardId").post(verifyJWT,buyAward);
router.route("/awards/pet/brought").get(verifyJWT,displayPetaward);





export default router