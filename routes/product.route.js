const express = require("express");
const passport = require("passport");
const productModel = require("../models/product.model");
var multer = require("multer");
const imageUpload = require("../middlewares/upload");
const router = express.Router();
const config = require("../config/default.json");
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
const MAX_IMAGE_PER_PRODUCT = 4;

/**
* @swagger
* components:
*   schemas:
*     Product:
*       type: object
*       required:
*         - product_id
*       properties:
*         product_id:
*           type: integer
*           description: The auto-generated id of the product
*         cagegory_id:
*           type: integer
*           description: The id of the category the product belongs to
*         product_name:
*           type: string
*           description: The name of the product
*         product_description:
*           type: string
*           description: The description of the product
*         product_brand:
*           type: string
*           description: The brand of the product
*         product_rating:
*           type: float
*           description: The rating of the product
*         product_stock_total:
*           type: integer
*           description: The total stock of the product
*         display_price:
*           type: float
*           description: The price of the product on the listing view
*         display_price_discounted:
*           type: float
*           description: The discounted price of the product on the listing view
*         display_image:
*           type: string
*           description: The image filename of the product on the listing view
*       example:
*         product_id: 1
*         category_id: 1
*         product_name: Asus pro 2023
*         product_description: Asus pro 2023 is a mighty powerhouse that brings ideas to life. It features the NVIDIA® Quadro GPU, and boasts a slim-bezel NanoEdge display for immersive visuals. Its combination of cutting-edge graphics and portability makes it perfect for creative professionals
*         product_brand: Asus
*         product_rating: 4.9
*         product_stock_total: 82
*         display_price: 1299.99
*         display_price_discounted: 1249.99
*         display_image: 1648288103368.jpg
*/

/**
  * @swagger
  * tags:
  *   name: Products
  *   description: The product managing API
  */

 /**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all the products and their details
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products and their details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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

 /**
 * @swagger
 * /products/brands:
 *   get:
 *     summary: Returns the list of all brands
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/brands", async function (req, res) {
  const brands = await productModel.getAllBrands();
  const joinedBrands = brands.reduce((acc, cur) => {
    if (!acc.includes(cur.product_brand)) {
      acc.push(cur.product_brand);
    }
    return acc;
  }, []);
  res.json(joinedBrands);
});

 /**
 * @swagger
 * /products/brands/top/{howMany}:
 *   get:
 *     summary: Returns the list of top brands
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of top brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/brands/top/:howMany", async function (req, res) {
  const howMany = +req.params.howMany;
  const brands = await productModel.getTopBrands(howMany);
  const joinedBrands = brands.reduce((acc, cur) => {
    if (!acc.includes(cur.product_brand)) {
      acc.push(cur.product_brand);
    }
    return acc;
  }, []);
  res.json(joinedBrands);
});

 /**
 * @swagger
 * /products/details/{id}:
 *   get:
 *     summary: Returns the detail of a product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The detail of a product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/details/:id", async function (req, res) {
  const product_detail_id = +req.params.id;
  const productDetail = await productModel.getProductDetailById(product_detail_id);
  res.json(productDetail)
})

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Returns the list of all products (no details)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of all products (no details)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/all", passport.authenticate("jwt.admin", { session: false }),async function (req, res) {
  const listProducts = await productModel.getAllProducts();
  console.log(typeof(listProducts))
  res.send({list:listProducts});
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Returns a product and its details
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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
        product_image: row.display_image,
        category_name: row.category_name,
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

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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

/**
 * @swagger
 * /products/addDetail:
 *   post:
 *     summary: Add a product detail
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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

/**
 * @swagger
 * /products/addBoth:
 *   post:
 *     summary: Add a product and 1 detail at the same time
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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

/**
 * @swagger
 * /products/:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.delete("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const {product_id} = req.body;
  productModel.del(product_id);
  res.status(200).json({ message: "Delete product successfully." });
});

/**
 * @swagger
 * /products/:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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

/**
 * @swagger
 * /products/detail:
 *   put:
 *     summary: Add a product detail
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

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
