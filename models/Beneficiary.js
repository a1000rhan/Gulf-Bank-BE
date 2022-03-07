const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const BeneficiarySchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    IBAN: { type: String, uppercase: true, maxlength: 30, minlength: 30 },
    address: String,
  },

  {
    timestamps: true,
  }
);

BeneficiarySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=fullname%>" });

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);
