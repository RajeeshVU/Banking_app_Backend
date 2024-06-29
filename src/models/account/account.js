import mongoose from "mongoose";
import { dateSet } from "../../utils/dateSet/dateSet.js";
const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  type: String,
  status:Boolean
});
const accountSchema = new mongoose.Schema(
  {
    holderName: { type: String, default: null },
    phone: { type: Number, default: null },
    photo: { type: String },
    pin: { type: Number },
    address: {
      house: { type: String },
      houseNo: { type: Number },
      district: { type: String },
      city: { type: String },
      state: { type: String },
      pinCode: { type: String },
      citizenship: { type: String },
    },
    balance: { type: Number, default: 0 },
    transactions: [transactionSchema],
    status: { type: Boolean, default: true },
  },
  { collection: "AccountsDB" }
);

export default mongoose.model("Accounts", accountSchema);
