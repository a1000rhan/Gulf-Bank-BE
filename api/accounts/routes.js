const express = require("express");
const passport = require("passport");

const {
  getAccounts,
  fetchAccount,
  createAccount,
  getAnAccount,
} = require("./controllers");

const router = express.Router();

router.param("accountId", async (req, res, next, id) => {
  const account = await fetchAccount(id, next);
  if (account) {
    req.account = account;
    next();
  } else {
    next({ status: 404, message: "trip not found" });
  }
});

router.get("/", getAccounts);
router.get("/:accountId", getAnAccount);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createAccount
);

module.exports = router;
