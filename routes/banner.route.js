const express = require("express");
const banner = require("../models/banner.model");
const router = express.Router();
const passport = require("passport");
router.get('/', async function (req, res) {
    const list = await banner.getAll();

    res.send({bannerList: list, empty: list.length === 0})
})

router.post('/add',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
    console.log(req.body)
    await banner.add(req.body)
    res.status(200).send("Add new voucher suceeded")
})

router.delete('/delete',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
   
    await banner.delete (req.body)
    res.status(200).send("Delete new voucher suceeded")
})

module.exports = router;
