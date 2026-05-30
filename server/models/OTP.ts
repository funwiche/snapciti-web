import mongoose, { Document } from "mongoose";
interface IOTP extends Document {
  identifier: string;
  purpose:
    | "login"
    | "register"
    | "reset-password"
    | "verify-email"
    | "verify-phone";
  code: string;
  attempts: number;
  expiresAt: Date;
  verifiedAt: Date;
  userAgent: string;
  ipAddress: string;
}

export default mongoose.model<IOTP>(
  "OTP",
  new mongoose.Schema<IOTP>(
    {
      identifier: { type: String, required: true, index: true },
      purpose: { type: String, required: true },
      code: { type: String, required: true, index: true },
      attempts: { type: Number, default: 0, index: true },
      expiresAt: { type: Date, required: true, index: true },
      verifiedAt: { type: Date, default: null },
      userAgent: { type: String, default: null },
      ipAddress: { type: String, default: null },
    },
    { timestamps: true, versionKey: false },
  ),
);
