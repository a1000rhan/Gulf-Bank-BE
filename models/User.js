const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [4],
    maxlength: [15, "Username must between 4 & 15 character"],
    required: true,
    // $nin: ["bank"],
    lowercase: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    match: [/^([^0-9]*)$/, "First Name must not include a number"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^([^0-9]*)$/, "Last Name must not include a number"],
  },
  password: {
    type: String,
    required: true,
    // match: [
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Minimum eight characters, at least one letter and one number",
    // ],
  },
  phoneNumber: {
    type: String,
    minlength: 8,
    required: true,
    match: [/^[0-9]{8}$/g, "phone number is more than 8 characters"],
  },
  civilId: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  //   Accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  //   Beneficiaries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary" }],
});

module.exports = mongoose.model("User", UserSchema);