const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists)
      return res
        .status(409)
        .send("an user is already registered by this email");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        const token = jwt.sign({ email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect(`/api/user/${user._id}/notes`);
      });
    });
  } catch (error) {
    console.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (!userExists) return res.status(401).send("Invalid Credentials");

    bcrypt.compare(password, userExists.password, function (err, result) {
      if (!result) return res.status(401).send("Invalid Credentials");

      const token = jwt.sign({ email }, process.env.JWT_KEY);
      res.cookie("token", token);

      res.redirect(`/api/user/${userExists._id}/notes`);
    });
  } catch (error) {
    console.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { login, register, logout };
