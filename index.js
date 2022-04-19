const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const imageUpload = require("./middlewares/upload");
const userModel = require("./models/customer.model");
var multer = require("multer");
require("./middlewares/auth");
const bodyParser = require("body-parser");
const config = require("./config/default.json");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("cors")());

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const list = await userModel.all();
  res.send(list);
});

const specs = swaggerDocument(config.swagger_options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/products", require("./routes/product.route"));
app.use("/customers", require("./routes/customer.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/voucher", require("./routes/voucher.route"));

app.use("/categories", require("./routes/category.route"));
app.use("/messages", require("./routes/message.route"));
app.use("/banner", require("./routes/banner.route"));
app.use("/order", require("./routes/order.route"));
/************** UPLOAD IMAGE *************************/
app.post("/uploadImage", (req, res) => {
  imageUpload.single("myImage")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return err;
    } else if (err) {
      console.log(err);
      return err;
    }

    console.log(req.file.filename);
    return res.send("Upload image succedded");
  });
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

require('./utils/socketio')(server)
