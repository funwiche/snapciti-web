import mongoose, { Schema, Types } from "mongoose";

const ReviewSchema = new Schema(
  {
    business: {
      type: Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    comment: { type: String, trim: true, maxlength: 5000, default: "" },
    reply: {
      comment: { type: String, trim: true, maxlength: 2000, default: "" },
      user: { type: Types.ObjectId, ref: "User", default: null },
      createdAt: { type: Date, default: null },
    },
    edited: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    reports: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model("Review", ReviewSchema);
