import { User } from "../models/userModel.js";
import { Video } from "../models/videoModel.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const subUnSubscribeToTheChanelController = asyncHandler(async (req, res) => {
  const { username, passward, selected_video_id } = req.body;

  if (!username || !passward || !selected_video_id) {
    return res.json({
      massage: "no account",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "there is no account like this",
    });
  }
  if (user) {
    const video = await Video.findOne({ _id: selected_video_id });
    if (!video) {
      return res.json({
        massage: "something is wrong",
      });
    }
    if (video) {
      const user2 = await User.findOne({ _id: video.owner_id });
      if (!user2) {
        return res.json({
          massage: "something is wrong",
        });
      }
      if (user2) {
        if (user._id.toString() == user2._id.toString()) {
          return res.json({
            massage: "you can not unsubscribe your self",
          });
        }

        if (user.ownSubscribeChanele.indexOf(user2._id) != -1) {
          await User.findByIdAndUpdate(user._id, {
            $pull: { ownSubscribeChanele: user2._id },
          });

          await User.findByIdAndUpdate(user2._id, {
            $pull: { followedBy: user._id },
          });
          let user3 = await User.findById(user2._id);
          return res.json({
            massage: "success-unsub",
            subscribeNumber: user3.followedBy.length,
          });
        } else if (user.ownSubscribeChanele.indexOf(user2._id) == -1) {
          user.ownSubscribeChanele.push(user2._id);
          await user.save();
          user2.followedBy.push(user._id);
          await user2.save();
          return res.json({
            massage: "success-sub",
            subscribeNumber: user2.followedBy.length,
          });
        }
      }
    }
  }
});
const likeUnLikeToTheVideoController = asyncHandler(async (req, res) => {
  const { username, passward, selected_video_id } = req.body;

  if (!username || !passward || !selected_video_id) {
    return res.json({
      massage: "no account",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "there is no account like this",
    });
  }
  if (user) {
    const video = await Video.findOne({ _id: selected_video_id });
    if (!video) {
      return res.json({
        massage: "something is wrong",
      });
    }
    if (video) {
      if (video.likesBy.indexOf(user._id) == -1) {
        video.likesBy.push(user._id);
        video.likes = video.likes + 1;
        user.likesVideo.push(video._id);
        await user.save();
        await video.save();
        const video2 = await Video.findById(video._id);
        if (video2.dislikeBy.indexOf(user._id) != -1) {
          await Video.findByIdAndUpdate(video._id, {
            $pull: { dislikeBy: user._id },
          });
          video2.dislikes = video.dislikes - 1;
          await video2.save();
          await User.findByIdAndUpdate(user._id, {
            $pull: { dislikesVideo: video._id },
          });
        }
        return res.json({
          massage: "success-like",
          likesOfVideo: video.likes,
        });
      }
      if (video.likesBy.indexOf(user._id) != -1) {
        await Video.findByIdAndUpdate(video._id, {
          $pull: { likesBy: user._id },
        });
        await User.findByIdAndUpdate(user._id, {
          $pull: { likesVideo: video._id },
        });
        video.likes = video.likes - 1;

        await video.save();
        return res.json({
          massage: "success-unlike",
          likesOfVideo: video.likes,
        });
      }
    }
  }
});

const dislikeUnDislikeToTheVideoController = asyncHandler(async (req, res) => {
  const { username, passward, selected_video_id } = req.body;

  if (!username || !passward || !selected_video_id) {
    return res.json({
      massage: "no account",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "there is no account like this",
    });
  }
  if (user) {
    const video = await Video.findOne({ _id: selected_video_id });
    if (!video) {
      return res.json({
        massage: "something is wrong",
      });
    }
    if (video) {
      if (video.dislikeBy.indexOf(user._id) == -1) {
        video.dislikeBy.push(user._id);
        video.dislikes = video.dislikes + 1;
        await video.save();
        user.dislikesVideo.push(video._id);
        await user.save();
        const video2 = await Video.findById(video._id);
        if (video2.likesBy.indexOf(user._id) != -1) {
          await Video.findByIdAndUpdate(video._id, {
            $pull: { likesBy: user._id },
          });

          video2.likes = video2.likes - 1;

          await video2.save();
          await User.findByIdAndUpdate(user._id, {
            $pull: { likesVideo: video._id },
          });
        }
        return res.json({
          massage: "success-dislike",
          likesOfVideo: video2.likes,
        });
      }
      if (video.dislikeBy.indexOf(user._id) != -1) {
        await Video.findByIdAndUpdate(video._id, {
          $pull: { dislikeBy: user._id },
        });
        await User.findByIdAndUpdate(user._id, {
          $pull: { dislikesVideo: video._id },
        });
        video.dislikes = video.dislikes - 1;

        await video.save();
        const video2 = await Video.findById(video._id);
        return res.json({
          massage: "success-undislike",
          likesOfVideo: video2.likes,
        });
      }
    }
  }
});
const subUnSubscribeToTheChanelByIdController = asyncHandler(
  async (req, res) => {
    const { username, passward, userId } = req.body;

    if (!username || !passward || !userId) {
      return res.json({
        massage: "no account",
      });
    }
    const user = await User.findOne({ username: username, passward: passward });
    if (!user) {
      return res.json({
        massage: "there is no account like this",
      });
    }
    if (user) {
      const user2 = await User.findOne({ _id: userId });
      if (!user2) {
        return res.json({
          massage: "something is wrong",
        });
      }
      if (user2) {
        if (user._id.toString() == user2._id.toString()) {
          return res.json({
            massage: "you can not unsubscribe your self",
          });
        }

        if (user.ownSubscribeChanele.indexOf(user2._id) != -1) {
          await User.findByIdAndUpdate(user._id, {
            $pull: { ownSubscribeChanele: user2._id },
          });

          await User.findByIdAndUpdate(user2._id, {
            $pull: { followedBy: user._id },
          });
          let user3 = await User.findById(user2._id);
          return res.json({
            massage: "success-unsub",
            subscribeNumber: user3.followedBy.length,
          });
        } else if (user.ownSubscribeChanele.indexOf(user2._id) == -1) {
          user.ownSubscribeChanele.push(user2._id);
          await user.save();
          user2.followedBy.push(user._id);
          await user2.save();
          return res.json({
            massage: "success-sub",
            subscribeNumber: user2.followedBy.length,
          });
        }
      }
    }
  },
);
export {
  subUnSubscribeToTheChanelController,
  likeUnLikeToTheVideoController,
  dislikeUnDislikeToTheVideoController,
  subUnSubscribeToTheChanelByIdController,
};
