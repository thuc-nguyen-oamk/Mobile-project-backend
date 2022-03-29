const express = require("express");
const order = require("../models/order.model");
const moment = require("moment");
const router = express.Router();

router.get("/",passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  var list = await order.get();
  //delete customer_password
  for (i in list) {
    delete list[i].customer_password;
    //console.log(order_detail_list)
    list[i]["order_detail"]=  await order.getDetail(list[i].order_id);
 
  }
  res.send({ orderList: list, empty: list.length === 0 });
});
// xu ly them thoi gian va status ban dau
router.post("/add",passport.authenticate("jwt", { session: false }), async function (req, res) {
  //get list order_detail first then get order_information
  const order_detail=req.body.order_detail;
  delete req.body.order_detail;
  const order_information = req.body
  
  //set initial status
  order_information["order_status"] = "Received";
   //set time now 
   order_information["order_created_at"] = moment().format("YYYY-MM-DD hh:mm:ss");

  const flag = await order.add(order_information);
  const new_order_id = flag.insertId;
 
  for(i in order_detail)
  {
    order_detail[i]["order_id"]=new_order_id
    await order.addDetail(order_detail[i]);
  }

  //console.log(order_detail.length)
  res.status(200).send("Add new order succeeded");
});


router.post("/update",passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  console.log(req.body);
  // await banner.add(req.body)
  await order.update(req.body);

  res.status(200).send("Update succeeded");
});

router.get("/customer/:id", passport.authenticate("jwt", { session: false }),async function (req, res) {
  const list = await order.getByCustomerID(req.params.id);
  //delete customer_password
  for (i in list) {
    delete list[i].customer_password;
    //console.log(order_detail_list)
    list[i]["order_detail"]=  await order.getDetail(list[i].order_id);
 
  }
  res.send({ orderList: list, empty: list.length === 0 });
});
router.get("/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const list = await order.getByID(req.params.id);
  //delete customer_password
  for (i in list) {
    delete list[i].customer_password;
    //console.log(order_detail_list)
    list[i]["order_detail"]=  await order.getDetail(list[i].order_id);
 
  }
  res.send({ orderList: list, empty: list.length === 0 });
});
module.exports = router;
