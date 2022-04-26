const express = require("express");
const passport = require("passport");
const userModel = require("../models/customer.model");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
var bcrypt = require('bcryptjs');

const router = express.Router();

let jwtSecretKeyLogin = config.authenticate.jwtSecret;
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customer_email
 *         - customer_name
 *         - customer_address
 *         - customer_phone
 *       properties:
 *         customer_id:
 *           type: int
 *           description: The auto-generated id of the customer
 *         customer_email:
 *           type: string
 *           description: customer email
 *         customer_name:
 *           type: string
 *           description: customer name
 *         customer_address:
 *           type: string
 *           description: customer address
 *         customer_phone:
 *           type: string
 *           description: customer phone
 *       example:
 *         customer_id: 1
 *         customer_email: ddkhoa@gmail.com
 *         customer_name: DINH DANG KHOA
 *         customer_address: Kalervontie 
 *         customer_phone: 123456789
 */
 /**
  * @swagger
  * tags:
  *   name: Customer
  *   description: The customer managing API
  */

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

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Customer'
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *       401:
 *         description: Unauthorized             
 *                   
 */
router.get('/', passport.authenticate("jwt.admin", { session: false }),async function (req, res) {
  const list = await userModel.getAll();
 for (i in list )
 {
   delete list[i].customer_password
 }
  res.send({userList: list, empty: list.length === 0})
})

// router.get('/:id', async function (req, res) {
//   const id = +req.params.id || -1;
//   const list = await userModel.getCustomerByID(id);

//   res.send({userList: list, empty: list.length === 0})
// })
/**
 * @swagger
 * /customers/update:
 *   post:
 *     summary: Update customer information
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                  type: int
 *               customer_email:
 *                  type: string
 *               customer_name:
 *                  type: string
 *               customer_address:
 *                  type: string
 *               customer_phone:
 *                  type: string
 *             example:
 *                customer_id: 69
 *                customer_email: ddkhoa@gmail.com
 *                customer_name: DINH DANG KHOA
 *                customer_address: Kalervontie
 *                customer_phone: '123456789'   
 *     responses:
 *       200:
 *         description: Update succeeded
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */

router.post('/update', passport.authenticate("jwt", { session: false }), async function (req, res) {
  console.log(req.body)
  // await customer.add(req.body)
 await userModel.updateCustomerInformation(req.body)

  res.status(200).send("Update succeeded")
})

router.get('/:id', passport.authenticate("jwt.admin", { session: false }),async function (req, res) {
  const id = +req.params.id || -1;
  const list = await userModel.single(id);
 for (i in list )
 {
   delete list[i].customer_password
 }
  res.send({userList: list, empty: list.length === 0})
})

module.exports = router;
