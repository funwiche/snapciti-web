import mongoose, { Schema, Types } from "mongoose";

const PRICING_TYPES = ["free", "fixed_price", "starting_at", "variable_price"];
const DURATION_UNITS = ["mins", "hours", "days", "weeks", "months"];

const ServiceSchema = new Schema(
  {
    business: {
      type: Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    user: { type: Types.ObjectId, ref: "User", required: true, index: true },
    slug: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: String,
    pricing: { type: String, default: "fixed_price" },
    amount: { type: Number, min: 0, default: 0 },
    currency: { type: String, uppercase: true, default: "XAF" },
    duration: { value: Number, unit: String },
    active: { type: Boolean, default: true, index: true },
    negotiable: Boolean,
    deposit: Number,
    availability: {
      mon: Boolean,
      tue: Boolean,
      wed: Boolean,
      thu: Boolean,
      fri: Boolean,
      sat: Boolean,
      sun: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ServiceSchema.index({ name: "text", description: "text" });
export default mongoose.model("Service", ServiceSchema);
