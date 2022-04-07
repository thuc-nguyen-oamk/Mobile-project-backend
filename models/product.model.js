var db = require("../utils/db");
const TABLE_NAME_1 = "product";
const TABLE_NAME_2 = "product_detail";
const config = require("../config/default.json");

module.exports = {
  getAllProducts: () => {
    return db.load(`select * 
    FROM ${TABLE_NAME_1}
    INNER JOIN category ON category.category_id = product.category_id
    `);
  },
  getAllProductDetail: (product_id) => {
    return db.load(`select * 
    FROM ${TABLE_NAME_2}
    INNER JOIN ${TABLE_NAME_1} ON product_detail.product_id = product.product_id
    INNER JOIN category ON category_id = product.category_id
    where product_id = ${product_id}
    `);
  },
  getProductById: (product_id) => {
    return db.load(`select * 
    FROM ${TABLE_NAME_1}
    LEFT JOIN ${TABLE_NAME_2} ON ${TABLE_NAME_1}.product_id = ${TABLE_NAME_2}.product_id
    INNER JOIN category ON ${TABLE_NAME_1}.category_id = category.category_id
    WHERE ${TABLE_NAME_1}.product_id = ${product_id}
    `);
  },
  getProductDetailById: (product_detail_id) => {
    return db.load(`select * 
    FROM ${TABLE_NAME_2}
    WHERE product_detail_id = ${product_detail_id}
    `);
  },
  addProduct: (productInfo, callback) => {
    // return db.add(TABLE_NAME_1, productInfo);
    db.pool.query("insert into product set ?", productInfo, callback);
  },
  addProductDetail: (productDetailInfo) => {
    return db.add(TABLE_NAME_2, productDetailInfo);
  },
  del: (product_id) => {
    db.del(TABLE_NAME_1, { product_id });
  },
  editProduct: (newProductInfo) => {
    const product_id = newProductInfo.product_id;
    delete newProductInfo.product_id;
    db.patch(TABLE_NAME_1, newProductInfo, { product_id });
  },
  editProductDetail: (newProductDetailInfo) => {
    const product_detail_id = newProductDetailInfo.product_detail_id;
    delete newProductDetailInfo.product_detail_id;
    db.patch(TABLE_NAME_2, newProductDetailInfo, { product_detail_id });
  },
  getAllBrands: () => {
    return db.load(`select distinct product_brand from ${TABLE_NAME_1} 
    where product_brand is not null and product_brand not like ''`);
  },
  getTopBrands: (howMany) => {
    return db.load(`select product_brand, count(*) as count from ${TABLE_NAME_1}
     where product_brand is not null and product_brand not like ''
    group by product_brand order by count desc limit ${howMany}`);
  },
  ///test here
};
