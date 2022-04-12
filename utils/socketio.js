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
      let token = data.token;
      token = token.replace(/"/g, "");
      const decoded = jwt.decode(token);
      console.log("decoded:", decoded);

      if (!decoded || !decoded.customer_id) {
        console.error(`Wrong token from ${socket.id}`);
        io.to(socket.id).emit("force disconnect", { msg: "Unauthorized." });
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
          socket.join(customerId);
        }
      });
    });

    socket.on("admin join", (data) => {
      console.log("data from admin client:", data);
      let token = data.token;
      token = token.replace(/"/g, "");
      const decoded = jwt.decode(token);
      console.log("decoded:", decoded);

      if (!decoded || !decoded.admin_id) {
        console.error(`Wrong token from ${socket.id}`);
        io.to(socket.id).emit("force disconnect", { msg: "Unauthorized." });
        socket.disconnect(true);
        return;
      }

      const adminId = decoded.admin_id;
      const customerId = data.customer_id
      messageModel.getAllMessagesOfAConversation(adminId, customerId, (err, messageList) => {
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
      console.log('[socket on msg] data:', data);
      global.io.in(data.room).emit("message", data);
      const {sender_id, receiver_id, message_text} = data
      messageModel.add({sender_id, receiver_id, message_text})
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");

      // global.io.emit("message", "user disconnected");
    });
  });
};
