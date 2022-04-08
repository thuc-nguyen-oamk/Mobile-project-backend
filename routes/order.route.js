const express = require("express");
const order = require("../models/order.model");
const customer=require("../models/customer.model")
const moment = require("moment");
const router = express.Router();
const passport = require("passport");
/**
 * @swagger
 * components:
 *   schemas:
 *     Order_detail:
 *       type: object
 *       required:
 *         - order_detail_id
 *         - order_id
 *         - product_name
 *         - product_price
 *         - product_amount
 *         - product_id
 *         - product_detail_id
 *        
 *       properties:
 *         order_detail_id:
 *           type: int
 *           description: The auto-generated id of the customer
 *         order_id:
 *           type: int
 *           description: get from order table
 *         product_id:
 *           type: int
 *           description: get from product table
 *         product_detail_id:
 *           type: int
 *           description: get from product detail table
 *         product_name:
 *           type: string
 *         product_price:
 *           type: float
 *         product_amount:
 *           type: float
 *       example:
 *         order_detail_id: 1
 *         order_id: 29
 *         product_id: 1
 *         product_detail_id: 1
 *         product_name: Asus pro 2023,
 *         product_price: 17.99
 *         product_amount: 2

 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - order_id
 *         - customer_id
 *         - order_address
 *         - order_status
 *         - order_total
 *         - order_created_at
 *         - voucher_id
 *       properties:
 *         order_id:
 *           type: int
 *           description: The auto-generated id of the customer
 *         customer_id:
 *           type: int
 *           description: get from customer table
 *         order_address:
 *           type: string
 *           description: order address
 *         order_status:
 *           type: string
 *           description: order status
 *         order_total:
 *           type: float
 *         order_created_at:
 *           type: date-time
 *         voucher_id:
 *           type: int
 *         customer_email:
 *           type: string
 *         customer_name:
 *           type: string
 *         customer_address:
 *            type: string
 *         customer_phone:
 *            type: string
 *         order_detail:
 *            type: array
 * 
 *           
 *                
 *       example:
 *         order_id: 1
 *         customer_id: 59
 *         order_address: Oulu
 *         order_status: Closed
 *         order_total: 1000,
 *         order_created_at: null
 *         voucher_id: null
 *         customer_email: bill1114@gmail.com
 *         customer_name: DINH DANG KHOA
 *         customer_address: Uusikatu 123, Oulu, Finland
 *         customer_phone: 123456789
 *         order_detail: [
 *            {
                    "order_detail_id": 1,
                    "order_id": 29,
                    "product_name": "Asus pro 2023",
                    "product_price": 19.99,
                    "product_amount": 2,
                    "product_id": 1,
                    "product_detail_id": 1,
                    "product_color": "Black",
                    "product_price_discounted": 17.99,
                    "product_stock": 20,
                    "product_images": "1648288103368.jpg"
                },]
 *      
 *            

 */

/**
  * @swagger
  * tags:
  *   name: Order
  *   description: The order managing API
  */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Order'
 *                          
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *       401: 
 *         description: Unauthorized                
 *                   
 */




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



/**
 * @swagger
 * /order/add:
 *   post:
 *     summary: Add new a order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id: 
 *                  type: int
 *               order_address:
 *                  type: string
 *               order_total:
 *                  type: float
 *               voucher_id:
 *                  type: int
 *               order_detail:
 *                  type: array
 *             example:
 *               "customer_id": 69
 *               "order_address": "Kalervontie"
 *               "order_total": 20000000,
 *               "voucher_id": null
 *               "order_detail": [
 *                     {
 *                   "product_id": 1,
 *                   "product_detail_id":1,
 *                   "product_name":"Asus pro 2023",
 *                   "product_price":17.99,
 *                   "product_amount":2,
 *                     }
 *                               ]     
 *     responses:
 *       200:
 *         description: The order was successfully created
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /order/update:
 *   post:
 *     summary: Add new a order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id: 
 *                  type: int
 *               order_status:
 *                  type: string
 *             example:
 *                order_id: 28
 *                order_status: Preparing     
 *     responses:
 *       200:
 *         description: The order was successfully updated
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */


router.post("/add",passport.authenticate("jwt", { session: false }), async function (req, res) {
  //get list order_detail first then get order_information
  const order_detail=req.body.order_detail;
  delete req.body.order_detail;
  const order_information = req.body
  
  //set initial status
  order_information["order_status"] = "Received";
   //set time now 

   order_information["order_created_at"] = moment().format("YYYY-MM-DD HH:mm:ss");

  const flag = await order.add(order_information);
  const new_order_id = flag.insertId;
 
  for(i in order_detail)
  {
    order_detail[i]["order_id"]=new_order_id
    await order.addDetail(order_detail[i]);
  }
  
  console.log("run")
  res.status(200).send("Add new order succeeded");
});

/**
 * @swagger
 * /order/update:
 *   post:
 *     summary: Add new a order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id: 
 *                  type: int
 *               order_status:
 *                  type: string
 *             example:
 *                order_id: 28
 *                order_status: Preparing     
 *     responses:
 *       200:
 *         description: The order was successfully updated
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */


router.post("/update", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  console.log(req.body);
  // await order.add(req.body)
  await order.update(req.body);

  res.status(200).send("Update succeeded");
});


/**
 * @swagger
 * /order//customer/{id}:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Order'
 *                          
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *       401: 
 *         description: Unauthorized                
 *                   
 */


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

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Order'
 *                          
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *       401: 
 *         description: Unauthorized                
 *                   
 */

 router.get("/statics/", passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  const listOrder = await order.get();
  //delete customer_password
  const listCustomer = await customer.getAll();
  var total=0
  for (i in listOrder) {
    delete listOrder[i].customer_password;
    //console.log(order_detail_list)
    total= total + listOrder[i]["order_total"];
 
  }

  res.send({money:total, listOrder:listOrder.length, listCustomer:listCustomer.length , listOrder2:listOrder });
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
