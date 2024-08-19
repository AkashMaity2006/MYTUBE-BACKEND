import { Router } from "express";
import {
  subUnSubscribeToTheChanelController,
  likeUnLikeToTheVideoController,
  dislikeUnDislikeToTheVideoController,
  subUnSubscribeToTheChanelByIdController,
} from "../controllers/videoRealetedApiControllers.js";

const router = Router();

router.route("/subAndUnSub").post(subUnSubscribeToTheChanelController);
router.route("/likeAndUnLike").post(likeUnLikeToTheVideoController);
router.route("/dislikeAndUnDislike").post(dislikeUnDislikeToTheVideoController);
router.route("/subAndUnSubById").post(subUnSubscribeToTheChanelByIdController);

export default router;
