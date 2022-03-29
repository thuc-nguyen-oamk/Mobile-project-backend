const express = require("express");
const passport = require("passport");
const userModel = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
var bcrypt = require('bcryptjs');

const router = express.Router();

let jwtSecretKeyLogin = config.authenticate.jwtSecret;

router.post("/register", async (req, res, next) => {
  console.log('req.body.customer_password',req.body.customer_password)
  var hash = bcrypt.hashSync(req.body.customer_password, bcrypt.genSaltSync(config["authenticate"].saltRounds));

  const check = await userModel.getCustomersByEmail(req.body.customer_email);

  if (check.length !== 0) {
    res.status(400).send("This email is already registered. Please use another one.");
    return
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
    res.status(201).send("Registration suceeded.")
    return
  } catch (err) {
    console.log('', err)
  }
  
});

router.post("/login", passport.authenticate("basic.customer", { session: false }), (req, res) => {
  const {customer_id, customer_email, customer_name, customer_address, customer_phone} = req.user
  const payload = {
    customer_id, customer_email, customer_name, customer_address, customer_phone
  };

  const token = jwt.sign(payload, jwtSecretKeyLogin);
  res.json({ token });
});


router.get('/', async function (req, res) {
  const list = await userModel.getAll();

  res.send({userList: list, empty: list.length === 0})
})

// router.get('/:id', async function (req, res) {
//   const id = +req.params.id || -1;
//   const list = await userModel.getCustomerByID(id);

//   res.send({userList: list, empty: list.length === 0})
// })

router.post('/update', async function (req, res) {
  console.log(req.body)
  // await banner.add(req.body)
 await userModel.updateCustomerInformation(req.body)

  res.status(200).send("Update succeeded")
})



module.exports = router;
