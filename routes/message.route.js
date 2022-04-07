const express = require("express");
const passport = require("passport");
const messageModel = require("../models/message.model");
const router = express.Router();
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));

router.get("/", async function (req, res) {
  res.sendFile('chat.html', {root: 'views/'});
  return

  
  const userId = req.user.customer_id || req.user.admin_id;
  if (req.user.customer_id) {
    console.log("customer id:", userId);
    // console.log(__dirname + "/views/chat.html")
    res.sendFile('chat.html', {root: 'views/'});
    return
  } else if (req.user.admin_id) {
    console.log("admin id:", userId);
  } else {
    console.log("user id not found");
  }
  res.json({msg: 'ok con de'})
});

router.get("/myMessages", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const userId = req.user.customer_id || req.user.admin_id;
  const list = await messageModel.getAllMessagesOfAnUser(userId);
  res.json(list);
});

router.get("/conversation/:anotherId", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const userId = req.user.customer_id || req.user.admin_id;
  const anotherId = req.params.anotherId
  const list = await messageModel.getAllMessagesOfAConversation(userId, anotherId);
  res.json(list);
});

router.get("/:id", async function (req, res) {
  const message_id = req.params.id;
  const list = await messageModel.single(message_id);
  res.json(list);
});

router.post("/", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const {sender_id, receiver_id} = req.body;
  if (sender_id == receiver_id) {
    res.status(400).json({
      message: "Cannot send message to yourself",
    });
    return;
  }
  messageModel.add(req.body);
  res.json({message: "Add message successfully"})
});

module.exports = router;
