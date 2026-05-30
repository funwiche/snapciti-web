import mongoose from "mongoose";
export default mongoose.model<ISession>(
  "Session",
  new mongoose.Schema<ISession>(
    {
      uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      token: { type: String, required: true, unique: true },
      userAgent: { type: String, default: null },
      ipAddress: { type: String, default: null },
      location: { type: String, default: null },
      expiresAt: { type: Date, required: true, index: true },
      revokedAt: { type: Date, default: null },
    },
    { timestamps: true, versionKey: false },
  ),
);
