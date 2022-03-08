const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");
exports.fetchAccount = async (accountId, next) => {
  try {
    const account = await Account.findById(accountId);
    return account;
  } catch (error) {
    next(error);
  }
};
exports.getTransactions = async (req, res, next) => {
  try {
    console.log(req.account);
    const transactions = await Account.findById({
      _id: req.account.id,
    }).populate("transactions");
    console.log(transactions);
    res.status(201).json(transactions);
  } catch (error) {
    next(error);
  }
};
exports.createTransaction = async (req, res, next) => {
  try {
    const account = await Account.findById(req.account._id);
    if (
      parseInt(account.balance) > parseInt(req.body.amount) &&
      req.body.method === "withdraw"
    ) {
      const newTransaction = await Transaction.create(req.body);
      const newBalance =
        parseInt(req.account.balance) - parseInt(req.body.amount);
      const updatedAccount = await Account.findByIdAndUpdate(
        { _id: account._id },
        { balance: newBalance, $push: { transactions: newTransaction._id } },
        { new: true }
      );
      res.status(201).json(updatedAccount);
    } else if (
      req.body.method === "transfer" &&
      parseInt(account.balance) > parseInt(req.body.amount)
    ) {
      const newTransaction = await Transaction.create(req.body);
      const newBalance =
        parseInt(req.account.balance) - parseInt(req.body.amount);
      const updatedAccount = await Account.findByIdAndUpdate(
        { _id: account._id },
        { balance: newBalance, $push: { transactions: newTransaction._id } },
        { new: true, runValidators: true }
      );
      const destAccount = await Account.findById({ _id: req.body.account });

      const updatedBalanceDestination =
        parseInt(req.body.amount) + parseInt(destAccount.balance);

      const destTransaction = await Transaction.create({
        method: "deposit",
        amount: req.body.amount,
        account: req.account._id,
      });
      const updatedDestination = await Account.findByIdAndUpdate(
        { _id: req.body.account },
        {
          balance: updatedBalanceDestination,
          $push: { transactions: destTransaction },
        }
      );
      console.log(
        "🚀 ~ file: controllers.js ~ line 65 ~ exports.createTransaction= ~ updatedDestination",
        updatedDestination
      );

      res.status(201).json(updatedAccount);
    } else res.status(401).json({ message: "Amount is not sufficient" });
  } catch (error) {
    next(error);
  }
};
