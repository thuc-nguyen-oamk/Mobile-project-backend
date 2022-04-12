const express = require("express");
const banner = require("../models/banner.model");
const router = express.Router();
const passport = require("passport");

/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - banner_image
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the banner
 *         banner_image:
 *           type: string
 *           description: The banner image png/jpg
 *       example:
 *         banner_id: 1
 *         banner_image: banner.png
 */
 /**
  * @swagger
  * tags:
  *   name: Banner
  *   description: The banner managing API
  */
/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: The list of the banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bannerList:
 *                      type: array
 *                      items:
 *                           $ref: '#/components/schemas/Banner'
 *                 empty: 
 *                      type: boolean
 *                      example: false
 *                       
 *                   
 */

router.get('/', async function (req, res) {
    const list = await banner.getAll();

    res.send({bannerList: list, empty: list.length === 0})
})


/**
 * @swagger
 * /banner/add:
 *   post:
 *     summary: Add new a banner
 *     tags: [Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               banner_image: 
 *                  type: string
 *             example:
 *                banner_image: banner2.png     
 *     responses:
 *       200:
 *         description: The banner was successfully created
 *       500:
 *         description: Some server error
 *      
 *       401:
 *         description: Unauthorized
 */



router.post('/add',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
  
    imageUpload.single("myImage")(req, res, function (err) {
   
        if (err instanceof multer.MulterError) {
          console.log(err);
          return err;
        } else if (err) {
          console.log(err);
          return err;
        }
    
        console.log(req.file.filename);
        await banner.add(req.file.filename)
       return res.status(200).send("Add new voucher suceeded")
        
      });

    return  res.status(200).send("Add new voucher suceeded")
})


/**
 * @swagger
 * /banner/delete/{id}:
 *   delete:
 *     summary: Remove the banner by id
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banner id
 * 
 *     responses:
 *       200:
 *         description: The banner was deleted
 *       404:
 *         description: The banner was not found
 *       401:
 *         description: Unauthorized
 */

router.delete('/delete/:id',passport.authenticate("jwt.admin", { session: false }), async function (req, res) {
   const condition = {
       "banner_id":req.params.id
   }
    await banner.delete (condition)
    res.status(200).send("Delete new voucher suceeded")
})

module.exports = router;
