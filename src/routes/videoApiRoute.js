import { Router } from "express";
import {
  gettingMyVideosController,
  gettingMixedVideosController,
  gettingMusicVideosController,
  gettingEducationVideosController,
  gettingReelsVideosControler,
  gettingSportsVideosController,
  gettingMoviesVideosController,
  gettingAnimationVideosController,
  gettingComedyVideosController,
  gettingVlogVideosController,
  gettingWatchedVideosController,
  gettingLikedVideosController,
  otherChaneleVideosController,
} from "../controllers/videoApiControllers.js";
const router = Router();
router.route("/gettingMyVideos").post(gettingMyVideosController);
router.route("/gettingMixedVideos").post(gettingMixedVideosController);
router.route("/gettingEducationVideos").post(gettingEducationVideosController);
router.route("/gettingMusicVideos").post(gettingMusicVideosController);

router.route("/gettingReelsVideos").post(gettingReelsVideosControler);
router.route("/gettingSportsVideos").post(gettingSportsVideosController);
router.route("/gettingMoviesVideos").post(gettingMoviesVideosController);
router.route("/gettingAnimationVideos").post(gettingAnimationVideosController);
router.route("/gettingComedyVideos").post(gettingComedyVideosController);
router.route("/gettingVlogVideos").post(gettingVlogVideosController);
router.route("/gettingWatchedVideos").post(gettingWatchedVideosController);
router.route("/gettingLikedVideos").post(gettingLikedVideosController);
router.route("/otherChaneleVideos").post(otherChaneleVideosController);

export default router;
