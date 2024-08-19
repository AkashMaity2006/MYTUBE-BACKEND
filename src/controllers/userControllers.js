import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerController = asyncHandler(async (req, res) => {
  const { username, fullname, passward } = req.body;
  if (!username || !username || !passward) {
    res.json({ massage: "something is problem" });
    res.send();
  }
  let user1 = await User.findOne({ username: username });
  if (user1) {
    res.json({ massage: "this name of user have already exit." });
    res.send();
  } else if (!user1) {
    let user = await User.create({
      username: username,
      fullname: fullname,
      passward: passward,
    });
    if (user) {
      res.json({ massage: "registered" });
      res.send();
    } else if (!user) {
      res.json({ massage: "something is problem" });
      res.send();
    }
  }
});
const loginController = asyncHandler(async (req, res) => {
  const { username, passward } = req.body;
  if (!username || !passward) {
    res.json({ massage: "something is problem" });
    res.send();
  }
  let user = await User.findOne({
    username: username,
  });
  if (user.passward === passward) {
    user.mytube_token = user._id;
    user.save();
    if (user.avatar_url) {
      res.json({
        massage: "login",
        mytube_token: user._id,
        username: user.username,
        fullname: user.fullname,
        passward: user.passward,
        avatarProfile: user.avatar_url,
      });
    } else if (!user.avatar_url) {
      res.json({
        massage: "login",
        mytube_token: user._id,
        username: user.username,
        fullname: user.fullname,
        passward: user.passward,
      });
    }
  } else {
    res.json({ massage: "something is problem" });
    res.send();
  }
});
const logoutController = asyncHandler(async (req, res) => {
  const { username, passward } = req.body;
  if (!username || !passward) {
    res.json({ massage: "something is problem" });
    res.send();
  }
  let user = await User.findOne({
    username: username,
  });
  if (!user) {
    res.json({ massage: "something is wrong." });
    res.send();
  } else if (user) {
    if (user.passward === passward) {
      res.json({ massage: "logout" });
      res.send();
    }
  }
});
const deleteAccountController = asyncHandler(async (req, res) => {
  const { username, passward } = req.body;
  if (!username || !passward) {
    res.json({ massage: "something is problem" });
    res.send();
  }
  let user = await User.findOne({
    username: username,
  });
  if (!user) {
    res.json({ massage: "something is wrong." });
    res.send();
  } else if (user) {
    if (user.passward === passward) {
      await User.deleteOne({ _id: user._id });
      res.json({ massage: "deleteAccount" });
      res.send();
    }
  }
});

const addProfileAvatarController = asyncHandler(async (req, res) => {
  const { username, passward } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }
  const user = await User.findOne({
    username: username,
  });
  if (user) {
    if (user.passward === passward) {
      const uploadedFile = await uploadOnCloudinary(req.file.path);
      if (uploadedFile) {
        user.avatar_url = uploadedFile.url;
        user.save();
        res.send("success");
      } else {
        res.send("something is going wrong");
      }
    } else {
      res.send("idiot it is not your account");
    }
  }
});

const updateFullNameController = asyncHandler(async (req, res) => {
  const { username, passward, newFullName } = req.body;
  if (!username || !passward) {
    res.send("you have no account");
  }
  const user = await User.findOne({
    username: username,
  });
  if (user) {
    if (user.passward === passward) {
      user.fullname = newFullName;
      user.save();
      res.json({ massage: "success" }).send();
    } else {
      res.send("idiot it is not your account");
    }
  }
});
const getAllMySubscribedChanelsController = asyncHandler(async (req, res) => {
  const { username, passward } = req.body;

  if (!username && !passward) {
    return res.json({
      massage: "you have no account.",
    });
  }

  const user = await User.findOne({ username: username, passward: passward });
  if (!user) {
    return res.json({
      massage: "you have no account.",
    });
  }
  if (user) {
    let subscribeChanelesIds = [];

    subscribeChanelesIds = await user.ownSubscribeChanele;
    subscribeChanelesIds.reverse();
    let subscribeChanelesDetails = [];
    for (let i = 0; i < subscribeChanelesIds.length; i++) {
      let subscribeChanele = await User.findById(subscribeChanelesIds[i]);
      if (!subscribeChanele) {
        return res.json({
          massage: "something is wrong.",
        });
      }
      let createObject = {
        userId: subscribeChanelesIds[i],
        chaneleName: subscribeChanele.fullname,
        chanellogo: subscribeChanele.avatar_url,
        subscribedNumber: subscribeChanele.ownSubscribeChanele.length,
        uploadedVideoNumber: subscribeChanele.ownVideo.length,
      };
      subscribeChanelesDetails.push(createObject);
    }

    return res.json({
      massage: "success",
      subscribeChanelesIds: subscribeChanelesIds,
      subscribeChanelesDetails: subscribeChanelesDetails,
    });
  }
});
export {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  addProfileAvatarController,
  updateFullNameController,
  getAllMySubscribedChanelsController,
};
