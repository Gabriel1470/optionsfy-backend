const db = require("../models/");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const dotenv = require("dotenv").config()
const user = db.user;
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  user.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    isEnabled: "Y",
  }).then(res.status(201)).send({ authorized: true })
    .catch(err => console.error(err));
  console.log(`${req.body.email} Added correctly in the database.`)
};

exports.signin = async (req, res) => {
  const checkUser = await user.findOne({ Where: { email: req.body.email } })

  if (checkUser && await bcrypt.compare(req.body.password, checkUser.password)) {
    const token = jwt.sign({
      id: checkUser.id, email: checkUser.email, password: checkUser.password
    }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

    checkUser.token = token;
    res.status(200).send({authorized: true, token: checkUser.token, email: req.body.email})
    console.log(`[SERVER]: ${req.body.email} Has successfully connected`)
  } else {
    res.status(400)
  }
}

exports.tokenIsValid = (req,res) => {
    req.status(200)
}
