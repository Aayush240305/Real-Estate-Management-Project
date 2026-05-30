import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },

    type: {
      type: String,
      enum: ["Apartment", "Villa", "Plot", "Commercial"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number,
    },

    description: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },
    status:{
      type:String,
      enum:["pending","approved","rejected"],
      default:"pending"
    },
    location:{
      lat:Number,
      lng:Number
    }
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
