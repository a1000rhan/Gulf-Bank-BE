const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
  {
    method: {
      type: String,
    },
    amount: { type: Number, min: 1 },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
