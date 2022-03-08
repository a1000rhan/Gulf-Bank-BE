const Account = require("../../models/Account");
const User = require("../../models/User");

exports.fetchAccount = async (accountId, next) => {
  try {
    const account = await Account.findById(accountId);
    return account;
  } catch (err) {
    next(err);
  }
};

exports.getAccounts = async (req, res, next) => {
  try {
    const AccountArray = await Account.find().populate("owner");
    res.json(AccountArray);
  } catch (err) {
    next(err);
  }
};

exports.getAnAccount = async (req, res, next) => {
  try {
    const oneAccount = await Account.findById({ _id: req.account.id });
    // const oneTrip = trips.find((e) => e.id === +id);
    res.json(oneAccount);
  } catch (err) {
    next(err);
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    console.log(
      "🚀 ~ file: controllers.js ~ line 37 ~ exports.createAccount= ~ req.params",
      req.user
    );
    const ownerId = req.user.id;

    req.body.owner = req.user._id;

    req.body.accountNumber =
      [4644210] + (Math.floor(Math.random() * 900000000) + 1);

    const newAccount = await Account.create(req.body);

    await User.findByIdAndUpdate(
      { _id: ownerId },
      { $push: { accounts: newAccount._id } }
    );

    return res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
};
