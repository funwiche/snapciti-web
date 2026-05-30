import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema<IUserAddress>(
  { country: String, city: String, state: String },
  { _id: false },
);
const ProviderSchema = new mongoose.Schema<IProvider>(
  { id: String, name: String, email: String, phone: String, avatar: String },
  { _id: false },
);
export default mongoose.model<IUser>(
  "User",
  new mongoose.Schema<IUser>(
    {
      name: { type: String, required: true },
      username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },
      email: { type: String, unique: true, sparse: true, trim: true },
      phone: { type: String, unique: true, sparse: true, trim: true },
      avatar: { type: String, default: "" },
      dob: { type: String, default: "" },
      password: { type: String, default: "" },
      gender: { type: String, default: "" },
      disabled: { type: Boolean, default: false },
      verified: { type: Boolean, default: false },
      lastLogin: { type: Date, default: Date.now },
      address: AddressSchema,
      providers: { google: ProviderSchema, facebook: ProviderSchema },
    },
    {
      timestamps: true,
      versionKey: false,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
  ),
);
