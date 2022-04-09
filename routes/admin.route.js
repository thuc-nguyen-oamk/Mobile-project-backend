const express = require("express");
const passport = require("passport");
const userModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
var bcrypt = require('bcryptjs');

const router = express.Router();

let jwtSecretKeyLogin = config.authenticate.jwtSecret;

router.post("/register", async (req, res, next) => {
  if (!req.body.secret || req.body.secret != config.authenticate.adminRegisterSecret) {
    console.error("AdminRegisterSecret is required")
    res.sendStatus(403)
    return
  }
  var hash = bcrypt.hashSync(req.body.admin_password, bcrypt.genSaltSync(config["authenticate"].saltRounds));

  const check = await userModel.getAdminsByEmail(req.body.admin_email);

  if (check.length !== 0) {
    res.status(400).send("This email is already registered. Please use another one.");
    return
  }

  var user = {
    admin_email: req.body.admin_email,
    admin_password: hash,
    admin_name: req.body.admin_name,
    admin_address: req.body.admin_address,
    admin_phone: req.body.admin_phone,
  };

  console.log('user',user)

  try {
    await userModel.add(user);
    res.status(201).send("Registration suceeded.")
    return
  } catch (err) {
    console.log('', err)
  }
  
});

router.post("/login", passport.authenticate("basic.admin", { session: false }), (req, res) => {
  const {admin_id, admin_email, admin_name, admin_address, admin_phone} = req.user
  const payload = {
    admin_id, admin_email, admin_name, admin_address, admin_phone
  };

  const token = jwt.sign(payload, jwtSecretKeyLogin);
  req.app.locals.adminId = admin_id
  console.log("req.app.locals.adminId:", req.app.locals.adminId);
  res.json({payload,token });
  
});



module.exports = router;
