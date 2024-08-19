import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const userSchema = new Schema(
  {
    username: {
      type: "String",
      unique: true,
    },
    fullname: {
      type: "String",
    },
    passward: {
      type: "String",
    },
    mytube_token: {
      type: "String",
    },
    avatar_url: {
      type: "String",
    },
    ownVideo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Videos",
      },
    ],
    watchedVideo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Videos",
      },
    ],
    likesVideo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Videos",
      },
    ],
    dislikesVideo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Videos",
      },
    ],

    ownSubscribeChanele: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    ownComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    followedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  },
);
userSchema.plugin(mongooseAggregatePaginate);
export const User = mongoose.model("Users", userSchema);
