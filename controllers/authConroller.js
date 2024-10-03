const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

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

        const token = jwt.sign({ email }, 'secretkey');
        res.cookie("token", token);
        res.redirect(`/api/user/${user._id}/notes`);
        // res.status(201).json({ mgs: "user registered successfully", user });
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
        
      const token = jwt.sign({ email }, 'secretkey');
      res.cookie("token", token);

      res.redirect(`/api/user/${userExists._id}/notes`);
    //   res.status(200).json({ mgs: "you can login", user: userExists });
    });
  } catch (error) {
    console.status(500).send(error);
  }
};

const logout = async (req, res) => {
    try {
        res.cookie("token", "");
        // res.redirect("/api/user/login");
        res.status(200).json({"msg": "user logged out"})
    } catch (error) {
        console.status(500).send(error);
    }
}

module.exports = { login, register, logout };
