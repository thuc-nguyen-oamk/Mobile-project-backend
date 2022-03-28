const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const imageUpload = require("./middlewares/upload");
const userModel = require("./models/customer.model");
var multer = require('multer');
require("./middlewares/auth")
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/users", async (req, res) => {
//   const list = await userModel.all();
//   res.send(list);
// });

app.use('/products', require('./routes/product.route'))
app.use('/customers', require('./routes/customer.route'))
app.use('/admin', require('./routes/admin.route'))
app.use('/voucher', require('./routes/voucher.route'))
app.use('/categories', require('./routes/category.route'))
/************** UPLOAD IMAGE *************************/
app.post("/uploadImage", (req, res) => {

 imageUpload.single("myImage")(req,res, function (err){
    if (err instanceof multer.MulterError) {
        console.log(err)
      } else if (err) {
        console.log(err)
      }
      else{
       console.log("it's ok")
      }
 })

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
