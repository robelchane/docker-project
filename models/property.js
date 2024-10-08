import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
  name: String,
  price: String,
  bedrooms: Number,
  bathrooms: Number,
  address: String,
  sellerName: String,
  sellerEmail: String, 
  detail: String,
  summary: String,
  image: String,
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
