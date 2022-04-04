const express = require("express");
const voucher = require("../models/voucher.model");
const router = express.Router();
const passport = require("passport");
/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       required:
 *         - voucher_value
 *         - voucher_expire_date
 *         - voucher_code
 *         - voucher_image
 * 
 *       properties:
 *         voucher_id:
 *           type: int
 *           description: The auto-generated id of the voucher
 *         voucher_value:
 *           type: float
 *           description: The valid voucher 
 *         voucher_expire_date:
 *           type: datetime
 *           description: The valid voucher    
 *         voucher_code:
 *           type: string   
 *           description: The valid voucher 
 *         voucher_image:
 *           type: string
 *           description: The valid voucher 
 *                  
 *       example:
 *         voucher_id: 1
 *         voucher_expire_date: 2022-04-01 00:00:00
 *         voucher_value: 1000
 *         voucher_code: POV
 *         voucher_image: voucher_image.png
 */
 /**
  * @swagger
  * tags:
  *   name: Voucher
  *   description: The voucher managing API
  */
/**
 * @swagger
 * /voucher:
 *   get:
 *     summary: Returns the list of all the vouchers
 *     tags: [Voucher]
 *     responses:
 *       200:
 *         description: The list of the vouchers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 voucherList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Voucher'
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *                       
 *                   
 */

router.get('/', async function (req, res) {
    const list = await voucher.get();

    res.send({voucherList: list, empty: list.length === 0})
})
/**
 * @swagger
 * /voucher/add:
 *   post:
 *     summary: Add new a voucher
 *     tags: [Voucher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 voucher_value:
 *                   type: float
 *                 voucher_expire_date:
 *                   type: datetime
 *                  
 *                 voucher_code:
 *                   type: string   
 *                    
 *                 voucher_image:
 *                   type: string
 *             example:
 *                
 *                 voucher_expire_date: 2022-04-01 00:00:00
 *                 voucher_value: 1000
 *                 voucher_code: POV
 *                 voucher_image: voucher_image.png  
 *     responses:
 *       200:
 *         description: The voucher was successfully created
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */
router.post('/add',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
    console.log(req.body)
    await voucher.add(req.body)
    res.status(200).send("Add new voucher suceeded")
})
/**
 * @swagger
 * /voucher/delete/{id}:
 *   delete:
 *     summary: Remove the voucher by id
 *     tags: [Voucher]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The voucher id
 * 
 *     responses:
 *       200:
 *         description: The voucher was deleted
 *       404:
 *         description: The voucher was not found
 *       401:
 *         description: Unauthorized
 */

router.delete('/delete/:id',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
    const condition = {
        "voucher_id":req.params.id
    }
    await voucher.delete (condition)
    res.status(200).send("Delete new voucher suceeded")
})



module.exports = router;
