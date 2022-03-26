const express = require("express");
const passport = require("passport");
const productModel = require("../models/product.model");
var multer = require("multer");
const imageUpload = require("../middlewares/upload");
const router = express.Router();
const config = require("../config/default.json");
const removeEmpty = (obj) => Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});

router.get("/", async function (req, res) {
  const list = await productModel.getAllProducts();
  res.send(list);
});

router.get("/:id", async function (req, res) {
  const product_id = +req.params.id || -1
  const list = await productModel.getProductById(product_id);
  res.send(list);
});

router.post("/add", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const { category_id, product_name, product_description, product_brand } = req.body;
  const productInfo = { category_id, product_name, product_description, product_brand };
  productModel.addProduct(productInfo, (err, dbResult) => {
    if (err) {
      console.error(err);
    } else {
      res.status(201).json({ message: "Add product successfully.", insertId: dbResult.insertId });
    }
  });
});

router.post("/addDetail", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.array("product_images", 4)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.sendStatus(400);
    } else if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("it's ok");
      console.log("req.files:", req.files);
      const { product_id, product_color, product_price, product_price_discounted, product_stock } = req.body;
      const product_images = req.files.reduce((acc, cur) => {
        return acc + cur.filename + ",";
      }, "");

      const productDetailInfo = { product_id, product_color, product_price, product_price_discounted, product_stock, product_images };
      console.log("productInfo:", productDetailInfo);
      productModel.addProductDetail(productDetailInfo);
      res.status(201).json({ message: "Add product detail successfully." });
    }
  });
});

router.post("/addBoth", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.array("product_images", 4)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.sendStatus(400);
    } else if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("it's ok");
      console.log("req.files:", req.files);
      const { category_id, product_name, product_description, product_brand } = req.body;
      const productInfo = { category_id, product_name, product_description, product_brand };
      productModel.addProduct(productInfo, (err, dbResult) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log("req.files:", req.files);
          const product_id = dbResult.insertId;
          const product_images = req.files.reduce((acc, cur) => {
            return acc + cur.filename + ",";
          }, "");
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

router.delete("/:id", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const product_id = req.params.id;
  productModel.del(product_id);
  res.status(200).json({ message: "Delete product successfully." });
});

router.put("/:id", async function (req, res) {
  const product_id = +req.params.id || -1;
  const { category_id, product_name, product_description, product_brand } = req.body;
  const newProductInfo = {category_id, product_name, product_description, product_brand}
  removeEmpty(newProductInfo)
  productModel.edit(product_id, newProductInfo)
  res.json({ message: "Edit product successfully." });
})

// router.post("/update", imageUpload.single("product_image"), async function (req, res) {
//   const rows = await productModel.single(req.body.product_id);

//   if (req.body.product_image == "") {
//     req.body.product_image = rows[0].product_image;
//   } else if (req.file) {
//     req.body.product_image = req.file.filename;
//   }
//   await productModel.patch(req.body);
//   req.session.success = "Update product information successfully !";
//   res.redirect("/admin/products");
// });

module.exports = router;
