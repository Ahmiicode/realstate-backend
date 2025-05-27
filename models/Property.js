import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  price: { type: String, required: true },
  image: { type: [String], required: true },  // in case of multiple images
  authorImage: { type: String, required: true },
  authorname: { type: String, required: true },
  featured: { type: Boolean, default: false }, // optional extra
  date: { type: Date, default: Date.now } // add date automatically
});

const property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default property;
