const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  method: {
    type: String,
  },
  amount: { type: Number, min: 1 },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  //   Beneficiaries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary" }],
});

module.exports = mongoose.model("Transaction", TransactionSchema);
