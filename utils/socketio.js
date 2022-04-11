const messageModel = require("../models/message.model");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = function configSocketIO(server) {
  global.io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  global.io.on("connection", async (socket) => {
    console.log("a user connected");
    socket.on("customer join", (data) => {
      console.log("data from client:", data);
      const token = data.token;
      const decoded = jwt.decode(token);
      console.log("decoded:", decoded);

      if (!decoded && !decoded.customer_id) {
        console.error(`Wrong token from ${socket.id}`);
        io.to(socket.id).emit("force disconnect", { msg: "Access denied" });
        socket.disconnect(true);
        return;
      }

      const customerId = decoded.customer_id;
      const adminId = global.adminId || config.authenticate.adminId;
      messageModel.getAllMessagesOfAConversation(customerId, adminId, (err, messageList) => {
        if (err) {
          console.log(err);
        } else {
          console.log("messageList:", messageList);
          global.io.to(socket.id).emit("join", { messageList });
          socket.join(customerId)
        }
      });
    });

    socket.on("message", (data) => {
      console.log(`message: ${data.msg}`);
      global.io.in(data.room).emit("message", data.msg);
      messageModel.add;
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");

      // global.io.emit("message", "user disconnected");
    });
  });
};
