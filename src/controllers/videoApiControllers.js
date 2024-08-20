import { User } from "../models/userModel.js";
import { Video } from "../models/videoModel.js";

import { asyncHandler } from "../utils/asyncHandler.js";

async function commonGenereFunctionRealted1(
  req,
  res,
  genare,
  alreadyGettingVideosKey,
) {
  let allMyVideos = [];
  let allMyVideosCounts = await Video.find({
    genare: genare,
  }).countDocuments();
  let howmuchIwant = 0;
  if (allMyVideosCounts - alreadyGettingVideosKey.length > 3) {
    howmuchIwant = 3;
  } else if (
    allMyVideosCounts - alreadyGettingVideosKey.length < 3 ||
    allMyVideosCounts - alreadyGettingVideosKey.length == 3
  ) {
    howmuchIwant = allMyVideosCounts - alreadyGettingVideosKey.length;
  }

  if (alreadyGettingVideosKey.length < allMyVideosCounts) {
    allMyVideos = await Video.find({
      genare: genare,
    })
      .skip(alreadyGettingVideosKey.length)
      .limit(howmuchIwant);
  }
  const allMyVideosKey = [];
  const allMyVideosLN = [];
  for (let i = 0; i < allMyVideos.length; i++) {
    const user = await User.findOne({ _id: allMyVideos[i].owner_id });
    if (user) {
      allMyVideosLN.push({
        chanellogo: user.avatar_url,
        chanelname: user.fullname,
      });
    }

    allMyVideosKey.push(allMyVideos[i]._id);
  }

  return res.json({
    massage: "success",
    allVideoDetails: allMyVideos,
    allVideosKey: allMyVideosKey,
    allVideosOwnerLN: allMyVideosLN,
  });
}

const gettingMyVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    res.send("you have no account");
  }
  if (user) {
    if (user.passward === passward) {
      let allMyVideos = [];
      let allMyVideosCounts = user.ownVideo.length;
      let howmuchIwant = 0;
      if (allMyVideosCounts - alreadyGettingVideosKey.length > 3) {
        howmuchIwant = 3;
      } else if (
        allMyVideosCounts - alreadyGettingVideosKey.length < 3 ||
        allMyVideosCounts - alreadyGettingVideosKey.length == 3
      ) {
        howmuchIwant = allMyVideosCounts - alreadyGettingVideosKey.length;
      }

      if (alreadyGettingVideosKey.length < allMyVideosCounts) {
        allMyVideos = await Video.find({ owner_id: user._id })
          .skip(alreadyGettingVideosKey.length)
          .limit(howmuchIwant);
      }
      const allMyVideosKey = [];
      const allMyVideosLN = [];
      for (let i = 0; i < allMyVideos.length; i++) {
        const user = await User.findOne({ _id: allMyVideos[i].owner_id });
        if (user) {
          allMyVideosLN.push({
            chanellogo: user.avatar_url,
            chanelname: user.fullname,
          });
        }

        allMyVideosKey.push(allMyVideos[i]._id);
      }

      res.json({
        massage: "success",
        allVideoDetails: allMyVideos,
        allVideosKey: allMyVideosKey,
        allVideosOwnerLN: allMyVideosLN,
      });
      res.send();
    }
  }
});

const gettingMixedVideosController = asyncHandler(async (req, res) => {
   const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }
  if(!alreadyGettingVideosKey){
      res.send("something is wrong");
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    res.send("you have no account");
  }
  if (user) {
    if (user.passward === passward) {
  let allMyVideos = [];
  allMyVideos = await Video.find().sort({ createdAt: -1 })  // Sort by `createdAt` in descending order
  .skip(alreadyGettingVideosKey.length)               // Skip the first `skip` documents
  .limit(9);           // Limit the result to `limit` documents
  
  const allMyVideosKey = [];
  const allMyVideosLN = [];
  for (let i = 0; i < allMyVideos.length; i++) {
    const user = await User.findOne({ _id: allMyVideos[i].owner_id });
    if (user) {
      allMyVideosLN.push({
        chanellogo: user.avatar_url,
        chanelname: user.fullname,
      });
    }

    allMyVideosKey.push(allMyVideos[i]._id);
  }

  res.json({
    massage: "success",
    allVideoDetails: allMyVideos,
    allVideosKey: allMyVideosKey,
    allVideosOwnerLN: allMyVideosLN,
  });
  res.send();

    }
  }
});

const gettingMusicVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "MUSIC", alreadyGettingVideosKey);
    }
  }
});

const gettingReelsVideosControler = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "REELS", alreadyGettingVideosKey);
    }
  }
});
const gettingEducationVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(
        req,
        res,
        "EDUCATION",
        alreadyGettingVideosKey,
      );
    }
  }
});
const gettingSportsVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "SPORTS", alreadyGettingVideosKey);
    }
  }
});
const gettingMoviesVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "MOVIE", alreadyGettingVideosKey);
    }
  }
});

const gettingAnimationVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(
        req,
        res,
        "ANIMATION",
        alreadyGettingVideosKey,
      );
    }
  }
});
const gettingComedyVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "COMEDY", alreadyGettingVideosKey);
    }
  }
});
const gettingVlogVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    return res.json({
      massage: "you have no account",
    });
  }
  if (!alreadyGettingVideosKey) {
    return res.json({
      massge: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "youb have no account",
    });
  }
  if (user) {
    if (user.passward === passward) {
      commonGenereFunctionRealted1(req, res, "VLOG", alreadyGettingVideosKey);
    }
  }
});
const gettingWatchedVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    res.send("you have no account");
  }
  if (user) {
    if (user.passward === passward) {
      let allMyVideos = [];
      let allMyVideosCounts = user.watchedVideo.length;
      let howmuchIwant = 0;
      let allMyVideosKey = [];
      let allMyVideosLN = [];
      if (allMyVideosCounts - alreadyGettingVideosKey.length > 3) {
        howmuchIwant = 3;
      } else if (
        allMyVideosCounts - alreadyGettingVideosKey.length < 3 ||
        allMyVideosCounts - alreadyGettingVideosKey.length == 3
      ) {
        howmuchIwant = allMyVideosCounts - alreadyGettingVideosKey.length;
      }

      allMyVideosKey = user.watchedVideo.slice(
        alreadyGettingVideosKey.length,
        alreadyGettingVideosKey.length + howmuchIwant,
      );

      for (let i = 0; i < allMyVideosKey.length; i++) {
        let video = await Video.findById(allMyVideosKey[i]);
        if (video) {
          allMyVideos.push(video);
        }
        let user2 = await User.findOne({ _id: allMyVideos[i].owner_id });
        if (user2) {
          allMyVideosLN.push({
            chanellogo: user2.avatar_url,
            chanelname: user2.fullname,
          });
        }
      }
      res.json({
        massage: "success",
        allVideoDetails: allMyVideos,
        allVideosKey: allMyVideosKey,
        allVideosOwnerLN: allMyVideosLN,
      });
    }
  }
});
const gettingLikedVideosController = asyncHandler(async (req, res) => {
  const { username, passward, alreadyGettingVideosKey } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    res.send("you have no account");
  }
  if (user) {
    if (user.passward === passward) {
      let allMyVideos = [];
      let allMyVideosCounts = user.likesVideo.length;
      let howmuchIwant = 0;
      let allMyVideosKey = [];
      let allMyVideosLN = [];
      if (allMyVideosCounts - alreadyGettingVideosKey.length > 3) {
        howmuchIwant = 3;
      } else if (
        allMyVideosCounts - alreadyGettingVideosKey.length < 3 ||
        allMyVideosCounts - alreadyGettingVideosKey.length == 3
      ) {
        howmuchIwant = allMyVideosCounts - alreadyGettingVideosKey.length;
      }

      allMyVideosKey = user.likesVideo.slice(
        alreadyGettingVideosKey.length,
        alreadyGettingVideosKey.length + howmuchIwant,
      );

      for (let i = 0; i < allMyVideosKey.length; i++) {
        let video = await Video.findById(allMyVideosKey[i]);
        if (video) {
          allMyVideos.push(video);
        }
        let user2 = await User.findOne({ _id: allMyVideos[i].owner_id });
        if (user2) {
          allMyVideosLN.push({
            chanellogo: user2.avatar_url,
            chanelname: user2.fullname,
          });
        }
      }
      res.json({
        massage: "success",
        allVideoDetails: allMyVideos,
        allVideosKey: allMyVideosKey,
        allVideosOwnerLN: allMyVideosLN,
      });
    }
  }
});
const otherChaneleVideosController = asyncHandler(async (req, res) => {
  const { username, passward, chaneleId, allgettedVideosKeyList } = req.body;

  if (!username || !passward || !chaneleId || !allgettedVideosKeyList) {
    return res.json({
      masage: "something is wrong",
    });
  }
  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    console.log("hello");

    return res.json({
      masage: "something is wrong",
    });
  }
  if (user) {
    const otherChanel = await User.findOne({ _id: chaneleId });
    if (!otherChanel) {
      return res.json({
        masage: "something is wrong",
      });
    }
    if (otherChanel) {
      let allVideosKey = [];
      let otherChanelVideosCount = otherChanel.ownVideo.length;
      let allVideosOwnerLN = [];
      let allVideoDetails = [];
      let howMuchIwant = 0;
      if (otherChanelVideosCount - allgettedVideosKeyList.length > 3) {
        howMuchIwant = 3;
      } else if (
        otherChanelVideosCount - allgettedVideosKeyList.length < 3 ||
        otherChanelVideosCount - allgettedVideosKeyList.length == 3
      ) {
        howMuchIwant = otherChanelVideosCount - allgettedVideosKeyList.length;
      }
      allVideosKey = await otherChanel.ownVideo.slice(
        allgettedVideosKeyList.length,
        allgettedVideosKeyList.length + howMuchIwant,
      );

      for (let i = 0; i < allVideosKey.length; i++) {
        allVideosOwnerLN.push({
          chanellogo: otherChanel.avatar_url,
          chanelname: otherChanel.fullname,
        });
        let video = await Video.findById(allVideosKey[i]);
        if (video) {
          allVideoDetails.push(video);
        }
      }

      return res.json({
        massage: "success",
        allVideosKey: allVideosKey,
        allVideoDetails: allVideoDetails,
        allVideosOwnerLN: allVideosOwnerLN,
      });
    }
  }
});
export {
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
};
