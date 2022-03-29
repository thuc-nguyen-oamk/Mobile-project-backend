const express = require("express");
const passport = require("passport");
const categoryModel = require("../models/category.model");
var multer = require("multer");
const imageUpload = require("../middlewares/upload");
const router = express.Router();
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));

router.get("/", async function (req, res) {
  const list = await categoryModel.all();
  res.json(list);
});

router.get("/:id", async function (req, res) {
  const category_id = req.params.id;
  const list = await categoryModel.single(category_id);
  res.json(list);
});

router.post("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.single("category_image")(req, res, async function (err) {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    const category_name = req.body.category_name;
    const check = await categoryModel.available(category_name);

    if (check.length !== 0) {
      res.status(400).json({ message: "Add new category fail because this name is not available !" });
      return;
    }
    const category = {
      category_name: category_name,
      category_image: req.file.filename,
    };
    await categoryModel.add(category);
    res.json({ message: "Add new category success !" });
  });
});

router.put("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  imageUpload.single("category_image")(req, res, async function (err) {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    if (req.file) req.body.category_image = req.file.filename
    await categoryModel.patch(req.body);
    res.json({ message: "Edit category success !" });
  });
});

router.delete("/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const {category_id} = req.body;
  categoryModel.del(category_id);
  res.status(200).json({ message: "Delete category successfully." });
});

module.exports = router;
