import mongoose from "mongoose";

const User = new mongoose.Schema({
  fullNames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: Array,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", User);
