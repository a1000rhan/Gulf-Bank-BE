const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
  },
  balance: { type: Number, required: true },
  accountNumber: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

module.exports = mongoose.model("Account", AccountSchema);
