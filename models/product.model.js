var db = require("../utils/db");
const TABLE_NAME_1 = "product";
const TABLE_NAME_2 = "product_detail";
module.exports = {
  getAllProducts: () => {
    return db.load(`select * 
    FROM ${TABLE_NAME_1}
    `);
  },
  getAllProductDetail: (product_id)=>{
    return db.load(`select * 
    FROM ${TABLE_NAME_2}
    INNER JOIN ${TABLE_NAME_1} ON product_detail.product_id = product.product_id
    INNER JOIN category ON category_id = product.category_id
    where product_id = ${product_id}
    `)
  }
  ///test here
};
