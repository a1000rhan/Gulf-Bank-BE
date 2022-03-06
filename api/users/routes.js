//call libraries:
const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
//call controller file:
const { signup, signin } = require("./controllers");

const router = express.Router();

router.post("/signup", upload.single("civilId"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
