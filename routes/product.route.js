const express = require("express");
const passport = require("passport");
const productModel = require("../models/product.model");
var multer = require("multer");
const imageUpload = require("../middlewares/upload");
const router = express.Router();
const config = require("../config/default.json");
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
const MAX_IMAGE_PER_PRODUCT = 4;

router.get("/:id", async function (req, res) {
  const product_id = +req.params.id || -1;
  const rows = await productModel.getProductById(product_id);
  const result = [];
  const index = {};
  rows.forEach(function (row) {
    if (!(row.product_id in index)) {
      index[row.product_id] = {
        product_id: row.product_id,
        category_id: row.category_id,
        product_name: row.product_name,
        product_description: row.product_description,
        product_rating: row.product_rating,
        product_stock_total: row.product_stock_total,
        product_brand: row.product_brand,
        details: [],
      };
      result.push(index[row.product_id]);
    }
    if (row.product_detail_id){
      index[row.product_id].details.push({
        product_detail_id: row.product_detail_id,
        product_color: row.product_color,
        product_price: row.product_price,
        product_price_discounted: row.product_price_discounted,
        product_stock: row.product_stock,
        product_images: row.product_images,
      });
    }
  });
  res.json(result);
});

router.get("/", async function (req, res) {
  let { category_id, product_name, product_description, product_brand } = req.query;
  category_id = category_id?.toLowerCase() || '';
  product_name = product_name?.toLowerCase() || '';
  product_description = product_description?.toLowerCase() || '';
  product_brand = product_brand?.toLowerCase() || '';
  const products = await productModel.getAllProducts();
  res.json(products.filter(product => {
    return product.category_id.toString().includes(category_id)
      && product.product_name.toLowerCase().includes(product_name)
      && product.product_description.toLowerCase().includes(product_description)
      && product.product_brand.toLowerCase().includes(product_brand)
  }));
});

router.post("/add", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const { category_id, product_name, product_description, product_brand } = req.body;
  const productInfo = { category_id, product_name, product_description, product_brand };
  removeEmpty(productInfo);
  productModel.addProduct(productInfo, (err, dbResult) => {
    if (err) {
      console.error(err);
    } else {
      res.status(201).json({ message: "Add product successfully.", insertId: dbResult.insertId });
    }
  });
});

router.post("/addDetail", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.array("product_images", MAX_IMAGE_PER_PRODUCT)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.sendStatus(400);
    } else if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const { product_id, product_color, product_price, product_price_discounted, product_stock } = req.body;
      let product_images = req.files.reduce((acc, cur) => acc + cur.filename + ",", "");
      if (product_images.endsWith(",")) product_images = product_images.slice(0, -1)
      const productDetailInfo = { product_id, product_color, product_price, product_price_discounted, product_stock, product_images };
      productModel.addProductDetail(productDetailInfo);
      res.status(201).json({ message: "Add product detail successfully." });
    }
  });
});

router.post("/addBoth", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.array("product_images", MAX_IMAGE_PER_PRODUCT)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.sendStatus(400);
    } else if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const { category_id, product_name, product_description, product_brand } = req.body;
      const productInfo = { category_id, product_name, product_description, product_brand };
      removeEmpty(productInfo);
      productModel.addProduct(productInfo, (err, dbResult) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const product_id = dbResult.insertId;
          let product_images = req.files.reduce((acc, cur) => acc + cur.filename + ",", "");
          if (product_images.endsWith(",")) product_images = product_images.slice(0, -1)
          const { product_color, product_price, product_price_discounted, product_stock } = req.body;
          const productDetailInfo = {
            product_id,
            product_color,
            product_price,
            product_price_discounted,
            product_stock,
            product_images,
          };
          productModel.addProductDetail(productDetailInfo);
          res.status(201).json({ message: "Add product and product detail successfully." });
        }
      });
    }
  });
});

router.delete("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const {product_id} = req.body;
  productModel.del(product_id);
  res.status(200).json({ message: "Delete product successfully." });
});

router.put("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const { product_id, category_id, product_name, product_description, product_brand } = req.body;
  const newProductInfo = { product_id, category_id, product_name, product_description, product_brand };
  removeEmpty(newProductInfo);
  if (!newProductInfo || Object.keys(newProductInfo).length === 0) {
    res.status(400).json({ message: "Missing product info." });
    return;
  }
  await productModel.editProduct(newProductInfo);
  res.status(200).json({ message: "Edit product successfully." });
});

router.put("/detail", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.array("product_images", MAX_IMAGE_PER_PRODUCT)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.sendStatus(400);
    } else if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const { product_detail_id, product_color, product_price, product_price_discounted, product_stock } = req.body;
      let product_images = req.files.reduce((acc, cur) => acc + cur.filename + ",", "");
      if (product_images.endsWith(",")) product_images = product_images.slice(0, -1)
      const newProductDetailInfo = {
        product_detail_id,
        product_color,
        product_price,
        product_price_discounted,
        product_stock,
        product_images,
      };
      productModel.editProductDetail(newProductDetailInfo);
      res.status(200).json({ message: "Edit product detail successfully." });
    }
  });
});

module.exports = router;