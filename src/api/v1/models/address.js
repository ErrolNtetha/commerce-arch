import mongoose from "mongoose";

const Address = new mongoose.Schema({
  line1: {
    type: String,
    required: false,
  },
  line2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zip: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Address", Address);
