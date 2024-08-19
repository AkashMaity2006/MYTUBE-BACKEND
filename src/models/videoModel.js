import { generateKey } from "crypto";
import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: "String",
    },
    description: {
      type: "String",
    },
    video_url: {
      type: "String",
    },
    genare: {
      type: "String",
    },
    views: {
      type: "Number",
      default: 0,
    },
    likes: {
      type: "Number",
      default: 0,
    },
    likesBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    dislikes: {
      type: "Number",
      default: 0,
    },
    dislikeBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    thumbnail_url: {
      type: "String",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  },
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Videos", videoSchema);
