import { subscribe } from "diagnostics_channel";
import { User } from "../models/userModel.js";
import { Video } from "../models/videoModel.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const uploadVideoController = asyncHandler(async (req, res) => {
  const {
    username,
    passward,
    title,
    description,
    video_url,
    thumbnail_url,
    genare,
  } = req.body;
  if (
    !username ||
    !passward ||
    !title ||
    !description ||
    !video_url ||
    !thumbnail_url ||
    !genare
  ) {
    res.send("something is problem");
    return null;
  }

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    res.send("you have no account");

    return null;
  }

  if (user) {
    if (user.passward === passward) {
      const video = await Video.create({
        owner_id: user._id,
        title: title,
        description: description,
        video_url: video_url,
        thumbnail_url: thumbnail_url,
        genare: genare,
      });
      if (video) {
        user.ownVideo.push(video._id);
        user.save();
        res.json(video);
        res.send();
      } else if (!video) {
        res.send("again upload video");
        return null;
      }
    } else if (user.passward !== passward) {
      res.send("it is not your passward");
      return null;
    }
  }
});

const selectedVideoDetailsController = asyncHandler(async (req, res) => {
  const { username, passward, selected_video_id } = req.body;
  if (!username || !passward) {
    res.json({
      massage: "no account",
    });
    res.send();
  }
  if (!selected_video_id) {
    res.json({
      massage: "you have not selected any video",
    });
    res.send();
  }

  const user = await User.findOne({
    username: username,
    passward: passward,
  });

  if (!user) {
    res.json({
      massage: "there is no account like this",
    });
    res.send();
  }
  if (user) {
    const video = await Video.findOne({ _id: selected_video_id });
    if (!video) {
      res.json({
        massage: "there is no video of this id",
      });
      res.send();
    }
    if (video) {
      const user2 = await User.findOne({ _id: video.owner_id });
      if (!user2) {
        res.json({
          massage: "something is wronng",
        });
        res.send();
      }
      if (user2) {
        let yourVideo = false;
        let viewsOfVideo = 0;
        let likesOfVideo = 0;
        let subscribeNumber = 0;

        subscribeNumber = user2.followedBy.length;

        if (user2._id.toString() == user._id.toString()) {
          yourVideo = true;
        }
        const followedByArray = user2.followedBy;
        let isFollowed = false;
        if (followedByArray.indexOf(user._id) != -1) {
          isFollowed = true;
        }
        if (followedByArray.indexOf(user._id) == -1) {
          isFollowed = false;
        }
        let heWatched = false;
        if (user.watchedVideo.indexOf(video._id) != -1) {
          heWatched = true;
        }
        if (user.watchedVideo.indexOf(video._id) == -1) {
          heWatched = false;
          video.views = video.views + 1;
          video.save();
          user.watchedVideo.push(video._id);
          user.save();
        }
        let heLiked = false;
        let heDisLiked = false;
        if (user.likesVideo.indexOf(video._id) == -1) {
          heLiked = false;
        }
        if (user.likesVideo.indexOf(video._id) != -1) {
          heLiked = true;
        }
        if (user.dislikesVideo.indexOf(video._id) == -1) {
          heDisLiked = false;
        }
        if (user.dislikesVideo.indexOf(video._id) != -1) {
          heDisLiked = true;
        }
        viewsOfVideo = video.views;
        likesOfVideo = video.likes;
        res.json({
          massage: "success",
          yourVideo: yourVideo,
          isFollowed: isFollowed,
          heDisLiked: heDisLiked,
          heLiked: heLiked,
          viewsOfVideo: viewsOfVideo,
          likesOfVideo: likesOfVideo,
          subscribeNumber: subscribeNumber,
        });

        res.send();
      }
    }
  }
});

export { uploadVideoController, selectedVideoDetailsController };
