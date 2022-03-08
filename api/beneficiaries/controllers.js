const Beneficiary = require("../../models/Beneficiary");
const User = require("../../models/User");

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
    const beneficiaries = await Beneficiary.find().populate("transactions");
    return res.json(beneficiaries);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
// exports.getABeneficiary = async (req, res, next) => {
//   try {
//     const oneBeneficiary = await Beneficiary.findById({ _id: req.beneficiary.id });
//     // const oneTrip = trips.find((e) => e.id === +id);
//     res.json(oneBeneficiary);
//   } catch (err) {
//     next(err);
//   }
// };

exports.createBeneficiary = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

    req.body.owner = req.user._id;

    const newBeneficiary = await Beneficiary.create(req.body);
    await User.findByIdAndUpdate(
      { _id: ownerId },
      { $push: { beneficiaries: newBeneficiary._id } }
    );

    return res.status(201).json(newBeneficiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
