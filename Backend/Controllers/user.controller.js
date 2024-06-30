const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");
require("dotenv").config();

const register = (req, res) => {
  const { userName, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ message: "Something went wrong while hashing" });
      } else {
        const user = new UserModel({ userName, email, password: hash, age });
        await user.save();
        res.status(200).send({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({
            message: "Something went wrong while comparing password",
          });
        } else if (result) {
          const token = jwt.sign(
            { email: user.email, userName: user.userName, user_id: user._id },
            process.env.JWT_SECRET
          );
          res.status(200).send({ message: "Login Successful", token: token });
        } else {
          res.status(200).send({ message: "User not found. Register first" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

module.exports = { register, login };
