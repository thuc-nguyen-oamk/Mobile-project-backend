const express = require("express");
const voucher = require("../models/voucher.model");
const router = express.Router();

router.get('/', async function (req, res) {
    const list = await voucher.get();

    res.send({voucherList: list, empty: list.length === 0})
})

router.post('/add',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
    console.log(req.body)
    await voucher.add(req.body)
    res.status(200).send("Add new voucher suceeded")
})

router.delete('/delete',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
   
    await voucher.delete (req.body)
    res.status(200).send("Delete new voucher suceeded")
})

module.exports = router;
