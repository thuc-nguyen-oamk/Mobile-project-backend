const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const imageUpload = require("./middlewares/upload");
const userModel = require("./models/customer.model");
var multer = require('multer');
require("./middlewares/auth")
const bodyParser = require("body-parser");
const config = require("./config/default.json")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(require("cors")())
app.use(express.static('assets'))


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const list = await userModel.all();
  res.send(list);
});


const specs = swaggerDocument(config.swagger_options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/products', require('./routes/product.route'))
app.use('/customers', require('./routes/customer.route'))
app.use('/admin', require('./routes/admin.route'))
app.use('/voucher', require('./routes/voucher.route'))
app.use('/chat', require('./routes/chat.route'))
app.use('/categories', require('./routes/category.route'))
app.use('/messages', require('./routes/message.route'))
app.use('/banner', require('./routes/banner.route'))
app.use('/order', require('./routes/order.route'))
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

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// const server = require("http").createServer();


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  // path: '/eshopmb/socket.io'
});

// const io = io.of('/io');

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        io.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        io.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        io.emit('message', 'user disconnected');
    })
})



// server.listen(3000);
