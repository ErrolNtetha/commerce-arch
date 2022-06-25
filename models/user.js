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
  // address: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Address",
  // },
  // authActivity: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Authentication",
  // },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", User);
