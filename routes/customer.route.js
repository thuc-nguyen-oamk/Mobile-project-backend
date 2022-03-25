const express = require("express");
const passport = require("passport");
const userModel = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
var bcrypt = require('bcryptjs');

const router = express.Router();

let jwtSecretKeyLogin = config.jwtSecret;

router.post("/register", async (req, res, next) => {
  console.log('req.body.customer_password',req.body.customer_password)
  var hash = bcrypt.hashSync(req.body.customer_password, bcrypt.genSaltSync(config["authenticate"].saltRounds));

  const check = await userModel.getCustomersByEmail(req.body.customer_email);

  if (check.length !== 0) {
    res.send("This email is already registered. Please use another one.");
  }

  var user = {
    customer_email: req.body.customer_email,
    customer_password: hash,
    customer_name: req.body.customer_name,
    customer_address: req.body.customer_address,
    customer_phone: req.body.customer_phone,
  };

  console.log('user',user)

  try {
    await userModel.add(user);
    res.send("Registration suceeded.")
  } catch (err) {
    console.log('', err)
  }
  
});

router.post("/login", passport.authenticate("basic", { session: false }), (req, res) => {
  const payload = {
    customer_id: req.user.user,
    customer_name: req.user.name,
  };

  const token = jwt.sign(payload, jwtSecretKeyLogin);
  res.json({ token });
});

module.exports = router;
