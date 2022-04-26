const express = require("express");
const passport = require("passport");
const messageModel = require("../models/message.model");
const router = express.Router();
const removeEmpty = (obj) => Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));

/**
  * @swagger
  * tags:
  *   name: Messages
  *   description: The message managing API
  */

/**
 * @swagger
 * /messages/customerWithLastMessageList:
 *   get:
 *     summary: Get the customer with the last message
 *     tags: [Messages]
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

router.get("/customerWithLastMessageList", passport.authenticate("jwt.admin", { session: false }), async (req, res) => {
  const users = await messageModel.getAllCustomersWithLastMessage();
  res.json(users);
});

/**
 * @swagger
 * /messages/adminId:
 *   get:
 *     summary: Get the admin's id
 *     tags: [Messages]
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

router.get("/adminId", passport.authenticate("jwt", { session: false }), async function (req, res) {
  res.json({ adminId: global.adminId });
});

/**
 * @swagger
 * /messages/myMessages:
 *   get:
 *     summary: Get all of a user's messages
 *     tags: [Messages]
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

/**
 * @swagger
 * /messages/conversation/{anotherId}:
 *   get:
 *     summary: Get all messages from a conversation
 *     tags: [Messages]
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

/**
 * @swagger
 * /messages/conversation/{anotherId}/lastMessage:
 *   get:
 *     summary: Get the last message from a conversation
 *     tags: [Messages]
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

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message by id
 *     tags: [Messages]
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

router.get("/:id", async function (req, res) {
  const message_id = req.params.id;
  const list = await messageModel.single(message_id);
  res.json(list);
});

/**
 * @swagger
 * /messages/:
 *   post:
 *     summary: Add a message to the database
 *     tags: [Messages]
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
