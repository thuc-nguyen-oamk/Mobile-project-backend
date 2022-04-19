const express = require("express");
const passport = require("passport");
const messageModel = require("../models/message.model");
const router = express.Router();
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));

router.get("/customerWithLastMessageList", passport.authenticate("jwt.admin", { session: false }), async (req, res) => {
  const users = await messageModel.getAllCustomersWithLastMessage();
  res.json(users);
});

router.get("/adminId", passport.authenticate("jwt", { session: false }), async function (req, res) {
  res.json({ adminId: global.adminId });
});

router.get("/myMessages", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const userId = req.user.customer_id || req.user.admin_id;
  messageModel.getAllMessagesOfAnUser(userId, (err, results) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ messages: results });
    }
  });
});

router.get("/conversation/:anotherId", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const userId = req.user.customer_id || req.user.admin_id;
  const anotherId = req.params.anotherId;
  messageModel.getAllMessagesOfAConversation(userId, anotherId, (err, results) => {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});

router.get("/conversation/:anotherId/lastMessage", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const userId = req.user.customer_id || req.user.admin_id;
  const anotherId = req.params.anotherId;
  messageModel.getLastMessageOfAConversation(userId, anotherId, (err, results) => {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", async function (req, res) {
  const message_id = req.params.id;
  const list = await messageModel.single(message_id);
  res.json(list);
});

router.post("/", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const { receiver_id } = req.body;
  const sender_id = req.user.customer_id || req.user.admin_id;
  if (sender_id == receiver_id) {
    res.status(400).json({
      message: "Cannot send message to yourself",
    });
    return;
  }
  messageModel.add(req.body);
  res.json({ message: "Add message successfully" });
});

module.exports = router;
