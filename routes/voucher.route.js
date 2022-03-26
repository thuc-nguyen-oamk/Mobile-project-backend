const express = require("express");
const voucher = require("../models/voucher.model");
const router = express.Router();

router.get('/', async function (req, res) {
    const list = await voucher.getAll();

    res.send({voucherList: list, empty: list.length === 0})
})


module.exports = router;
