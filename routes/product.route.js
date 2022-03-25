const express = require("express");
const passport = require("passport");
const productModel = require("../models/product.model");

const router = express.Router();

router.get("/", async function (req, res) {
  const list = await productModel.getAllProducts()
  res.send(list)

});

module.exports = router;
