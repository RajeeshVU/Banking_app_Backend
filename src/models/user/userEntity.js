import mongoose from "mongoose";
import Accounts from "../account/account.js";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    pin: { type: Number },
    phone: { type: Number },
    password: { type: String },
    photo: { type: String },
    role: { type: String, default: "user" },
    accountNo: { type: Number, ref: Accounts, default: null },
    email: { type: String, required: true, unique: true },
    status:{type:Boolean,default:true}
  },
  { collection: "UserDB", timestamps: true }
);

export default mongoose.model("User", userSchema);
