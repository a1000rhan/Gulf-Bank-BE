const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
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
AccountSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=nickName%>" });
module.exports = mongoose.model("Account", AccountSchema);
