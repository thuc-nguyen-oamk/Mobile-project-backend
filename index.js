const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const imageUpload = require("./middlewares/upload");
const userModel = require("./models/user.model");
var multer = require('multer');
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const list = await userModel.all();
  res.send(list);
});



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
