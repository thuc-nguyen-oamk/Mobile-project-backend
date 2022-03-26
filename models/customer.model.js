var db = require('../utils/db');
const DB_NAME = "eshopmb"
const TABLE_NAME= 'customer';
module.exports = {
  getAllCustomer: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  register:(customerInfo) => {
    return db.add(TABLE_NAME, customerInfo);
  },
  getCustomersByEmail: customer_email => {
    return db.load(`select * from customer where customer_email = '${customer_email}'`);
  },
  add: entity => {
    return db.add('customer', entity);
  },
  

};
