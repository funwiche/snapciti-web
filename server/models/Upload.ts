import mongoose, { Schema, Document } from "mongoose";

export interface IUpload extends Document {
  filename: string;
  mimeType: string;
  caption?: string;
  field: string;
  size: number;
  buffer: Buffer;
  uid: mongoose.Types.ObjectId;
  identifier: mongoose.Types.ObjectId;
}

export default mongoose.model<IUpload>(
  "Upload",
  new Schema<IUpload>(
    {
      uid: { type: Schema.Types.ObjectId, index: true },
      identifier: { type: Schema.Types.ObjectId, index: true },
      filename: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
      },
      caption: { type: String, default: "" },
      field: { type: String, required: true },
      mimeType: { type: String, required: true, default: "image/webp" },
      buffer: { type: Buffer, required: true },
      size: { type: Number, required: true, max: 5 * 1024 * 1024 }, // 5MB
    },
    { timestamps: true, versionKey: false },
  ),
);
