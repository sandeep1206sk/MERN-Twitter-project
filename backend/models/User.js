import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String,required: true, },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    location: { type: String },
    dateOfBirth: { type: Date},
    followers: { type: Array, defaultValue: [] },
    following: { type: Array, defaultValue: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
