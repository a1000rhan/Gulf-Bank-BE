const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  fetchBeneficiary,
  beneficiaryListFetch,
  createBeneficiary,
  deleteBeneficiary,
  getABeneficiary,
} = require("./controllers");

//param meddileware
router.param("beneficiaryId", async (req, res, next, beneficiaryId) => {
  const Beneficiary = await fetchBeneficiary(beneficiaryId, next);
  if (Beneficiary) {
    req.Beneficiary = Beneficiary;
  } else {
    next({ status: 404, messege: "Beneficiary not found" });
  }
  req.Beneficiary = Beneficiary;
  next();
});

router.get("/", beneficiaryListFetch);

// router.get("/:beneficiaryId", getABeneficiary);

// Beneficiary Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createBeneficiary
);

// Beneficiary Delete
router.delete("/:beneficiaryId", deleteBeneficiary);

module.exports = router;
