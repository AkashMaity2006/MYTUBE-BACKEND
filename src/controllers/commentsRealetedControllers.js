import { User } from "../models/userModel.js";
import { Video } from "../models/videoModel.js";
import { Comment } from "../models/commentModel.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const addMyCommentController = asyncHandler(async (req, res) => {
  const { username, passward, videoId, allGettedComentsKeys, comment } =
    req.body;
  if (!username || !passward) {
    return res.json({
      massage: " you have no account",
    });
  }
  if (!videoId) {
    return res.json({
      massage: "something is wrong",
    });
  }
  if (!comment) {
    return res.json({
      massage: "you have no comment",
    });
  }
  const user = await User.findOne({
    username: username,
    passward: passward,
  });
  if (!user) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (user) {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.json({
        massage: "something is wrong",
      });
    }
    if (video) {
      const user2 = await User.findById(video.owner_id);
      if (!user2) {
        return res.json({
          massage: "something is wrong",
        });
      }
      if (user2) {
        const uploadedComment = await Comment.create({
          owner_id: user._id,
          video_id: video._id,
          content: comment,
        });
        if (!uploadedComment) {
          return res.json({
            massage: "something is wrong",
          });
        }
        if (uploadedComment) {
          video.comments.push(uploadedComment._id);
          video.save();
          user.ownComments.push(uploadedComment._id);
          user.save();

          return res.json({
            massage: "success",
            commentDetails: uploadedComment,
            chaneleDetails: {
              chanellogo: user.avatar_url,
              chanelname: user.fullname,
            },
          });
        }
      }
    }
  }
});
const getCommentOfThisVideo = asyncHandler(async (req, res) => {
  const { username, passward, videoId, allGettedComentsKeys } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!videoId) {
    return res.json({
      massage: "something is wrong",
    });
  }
  const user = await User.findOne({
    username: username,
    passward: passward,
  });
  if (!user) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (user) {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.json({
        massage: "something is wrong",
      });
    }
    if (video) {
      const user2 = await User.findById(video.owner_id);
      if (!user2) {
        return res.json({
          massage: "something is wrong",
        });
      }
      if (user2) {
        let allCommentsKeyList = [];
        let allCommentsDetailsList = [];
        let allCommentsChanelInfoList = [];
        let howmuchYouWant = 0;
        let lengthOfAllComments = await video.comments.length;
        if (lengthOfAllComments - allGettedComentsKeys.length > 6) {
          howmuchYouWant = 6;
        }
        if (
          lengthOfAllComments - allGettedComentsKeys.length < 6 ||
          lengthOfAllComments - allGettedComentsKeys.length == 6
        ) {
          howmuchYouWant = lengthOfAllComments - allGettedComentsKeys.length;
        }
        allCommentsKeyList = await video.comments
          .reverse()
          .slice(
            allGettedComentsKeys.length,
            allGettedComentsKeys.length + howmuchYouWant,
          );

        for (let i = 0; i < allCommentsKeyList.length; i++) {
          let comment = await Comment.findById(allCommentsKeyList[i]);
          if (comment) {
            let ownerChanelOfComment = await User.findById(comment.owner_id);
            if (ownerChanelOfComment) {
              allCommentsDetailsList.push(comment);
              allCommentsChanelInfoList.push({
                chanellogo: ownerChanelOfComment.avatar_url,
                chanelname: ownerChanelOfComment.fullname,
              });
            }
          }
        }

        return res.json({
          massage: "success",
          allCommentsKeyList: allCommentsKeyList,
          allCommentsDetailsList: allCommentsDetailsList,
          allCommentsChanelInfoList: allCommentsChanelInfoList,
        });
      }
    }
  }
});

export { addMyCommentController, getCommentOfThisVideo };
