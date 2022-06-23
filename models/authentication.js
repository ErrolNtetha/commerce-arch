import mongoose from "mongoose";

const Authentication = new mongoose.Schema({
  device: {
    type: Array,
    required: false,
  },
  location: {
    type: Array,
    required: false,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiry: {
    type: String,
    required: false,
  },
});

export default mongoose.model("authentication", Authentication);
