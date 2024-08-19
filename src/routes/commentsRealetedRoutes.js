import { Router } from "express";
import {
  addMyCommentController,
  getCommentOfThisVideo,
} from "../controllers/commentsRealetedControllers.js";

const router = Router();

router.route("/addMyComment").post(addMyCommentController);
router.route("/getCommentOfThisVideo").post(getCommentOfThisVideo);

export default router;
