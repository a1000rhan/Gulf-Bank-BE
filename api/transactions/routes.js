//call libraries:
const express = require("express");
const router = express.Router();
const passport = require("passport");
//call controller file:
const {
  getTransactions,
  createTransaction,
  fetchAccount,
} = require("./controllers");
router.param("accountId", async (req, res, next, accountId) => {
  const foundAccount = await fetchAccount(accountId, next);
  if (foundAccount) {
    req.account = foundAccount;
    next();
  } else next({ status: 404, message: "Account not found" });
});

router.get("/:accountId", getTransactions);
router.post("/:accountId", createTransaction);
module.exports = router;
