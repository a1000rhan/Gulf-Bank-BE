const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jsonweb = require("jsonwebtoken");
const { JWT_EXPIRATION, JWT_SECRET } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION,
  };
  const token = jsonweb.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.civilId = `${req.protocol}://${req.get("host")}/${
        req.file.path
      }`;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      civilId: req.body.civilId,
    });
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};
