import { Router } from "express";

import { upload } from "../middlewares/multer.js";

import {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  addProfileAvatarController,
  updateFullNameController,
  getAllMySubscribedChanelsController,
} from "../controllers/userControllers.js";
const router = Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);
router.route("/deleteAccount").post(deleteAccountController);
router
  .route("/addProfileAvatar")
  .post(upload.single("profileImage"), addProfileAvatarController);
router.route("/test").post((req, res) => {
  console.log(req.files);
  res.send("hello");
});
router.route("/updateFullName").post(updateFullNameController);
router
  .route("/getALlMySubscribedChanel")
  .post(getAllMySubscribedChanelsController);

export default router;
