var db = require('../utils/db');
var config = require('../config/default.json')
const TABLE_NAME= ` ${config.mysql.database}.order`;
const TABLE_NAME2= `order_detail`;
module.exports = {
  get: () => {
    
    return db.load(`select * from ${TABLE_NAME} INNER JOIN customer ON customer.customer_id =${TABLE_NAME}.customer_id`);
  },
  add: (entity) => {
    return db.add(TABLE_NAME,entity);
  },
  // delete: (condition) => {
  //   return db.del(TABLE_NAME,condition);
  // },
  update: (entity) => {
    const order_id = {
      order_id: entity.order_id
    }
    return db.patch(TABLE_NAME,entity,order_id);
  },
  getByCustomerID:  (customer_id) => {
    
    return db.load(`select * from ${TABLE_NAME} INNER JOIN customer ON customer.customer_id = ${TABLE_NAME}.customer_id where ${TABLE_NAME}.customer_id= ${customer_id} ` );
  },
  addDetail: (entity) => {
    return db.add(TABLE_NAME2,entity);
  },
  getDetail:(order_id)=>{
    return db.load(`select * from ${TABLE_NAME2} INNER JOIN product_detail ON product_detail.product_detail_id = order_detail.product_detail_id 
    where order_id = ${order_id} `)
  },
  getByID:(order_id)=>{
    return db.load(`select * from ${TABLE_NAME} INNER JOIN customer ON customer.customer_id =${TABLE_NAME}.customer_id where order_id=${order_id}`);
  }
};