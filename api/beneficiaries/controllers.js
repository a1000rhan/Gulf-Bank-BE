const Beneficiary = require("../../models/Beneficiary");

exports.fetchBeneficiary = async (beneficiaryId, next) => {
  try {
    const beneficiary = await Beneficiary.findById(beneficiaryId);
    return beneficiary;
  } catch (error) {
    next(error);
  }
};

exports.beneficiaryListFetch = async (req, res, next) => {
  try {
    const beneficiaries = await Beneficiary.find();
    return res.json(beneficiaries);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.createBeneficiary = async (req, res, next) => {
  try {
    const newBeneficiary = await Beneficiary.create(req.body);

    return res.status(201).json(newBeneficiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateBeneficiaries = async (req, res, next) => {
  try {
    const beneficiary = await Beneficiary.findByIdAndUpdate(
      { _id: req.Beneficiary.id },
      req.body,
      { new: true, runValidators: true }
    );

    res.json(beneficiary);
  } catch (error) {
    next(error);
  }
};

exports.deleteBeneficiary = async (req, res, next) => {
  try {
    await req.Beneficiary.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
