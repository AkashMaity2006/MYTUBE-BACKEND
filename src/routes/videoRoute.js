import { Router } from "express";

import {
  uploadVideoController,
  selectedVideoDetailsController,
} from "../controllers/videoControllers.js";
const router = Router();

router.route("/uploadVideo").post(uploadVideoController);
router.route("/getselectedVideoDetails").post(selectedVideoDetailsController);
//router.route("/updateVideoDetails").post()

//router.route("/gettingMyLikesVideos").get()
//router.route("/deleteMyVideos").post()
//router.route("/gettingMyWatchedVideos").get()

export default router;
