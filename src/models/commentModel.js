import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Videos",
    },
    content: {
      type: "String",
    },
  },
  {
    timestamps: true,
  },
);
commentSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model("Comments", commentSchema);
