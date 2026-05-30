import mongoose, { Schema, Types } from "mongoose";
const BusinessSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: "User", required: true, index: true },
    admins: [{ type: Types.ObjectId, ref: "User" }],
    name: { type: String, required: true, trim: true, index: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, default: "" },
    logo: { type: String, default: null },
    cover: { type: String, default: null },
    images: [String],
    email: { type: String, lowercase: true, trim: true, default: "" },
    categories: { type: [String], required: true, index: true },
    phone: { type: String, trim: true, default: "" },
    whatsapp: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    socialLinks: [{ name: String, url: String }],
    amenities: [String],
    languages: [String],
    services: [Map], //{name:"",pricing:"",amount:null,duration:{value:null,unit:""}}
    hours: {
      mon: { type: Schema.Types.Mixed, default: null }, // String, [{open: String,close: String}]
      tue: { type: Schema.Types.Mixed, default: null },
      wed: { type: Schema.Types.Mixed, default: null },
      thu: { type: Schema.Types.Mixed, default: null },
      fri: { type: Schema.Types.Mixed, default: null },
      sat: { type: Schema.Types.Mixed, default: null },
      sun: { type: Schema.Types.Mixed, default: null },
    },
    location: {
      type: { type: String, enum: ["Point"], required: true, default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    address: {
      country: { type: String, required: true, index: true },
      city: { type: String, required: true, index: true },
      state: String,
      street: String,
      currency: String,
      timezone: String,
      directions: { type: Boolean, default: false },
    },
    reviewStats: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, min: 0, default: 0 },
      breakdown: {
        one: { type: Number, default: 0 },
        two: { type: Number, default: 0 },
        three: { type: Number, default: 0 },
        four: { type: Number, default: 0 },
        five: { type: Number, default: 0 },
      },
    },
    views: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    verified: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false, index: true },
    disabled: { type: Boolean, default: false, index: true },
    claimed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
BusinessSchema.index({ location: "2dsphere" });
BusinessSchema.index({ name: "text", description: "text", tags: "text" });
export default mongoose.model("Business", BusinessSchema);

// users
// places
// businesses
// reviews
// services
// photos
// favourites
// Catalog
