const express = require("express");
const order = require("../models/order.model");
const router = express.Router();

router.get('/', async function (req, res) {
    const list = await order.get();

    res.send({orderList: list, empty: list.length === 0})
})

router.post('/add', async function (req, res) {
    console.log(req.body)
    await order.add(req.body)
    res.status(200).send("Add new order suceeded")
})

router.delete('/delete', async function (req, res) {
   
    await order.delete (req.body)
    res.status(200).send("Delete new order suceeded")
})

module.exports = router;
