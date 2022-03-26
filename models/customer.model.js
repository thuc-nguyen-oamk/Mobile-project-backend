var db = require('../utils/db');

const TABLE_NAME= 'customer';
module.exports = {
  getAllCustomer: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  getCustomerByID: (customer_id) => {
    return db.load(`select * from ${TABLE_NAME} where customer_id = ${customer_id}`);
  },
  updateCustomerInformation: (entity) => {
    //payload {customer_id: 1}
    const customer_id = {
      customer_id: entity.customer_id
    }
    //delete customer_id to avoid update primary key
    delete  entity.customer_id;
    return db.patch(TABLE_NAME,entity,customer_id);
  },
  // addNew: (entity) => {
  //   return db.add(TABLE_NAME,entity);
  // },

  // register:(customerInfo) => {
  //   return db.gitadd(TABLE_NAME, customerInfo);
  // },
  getCustomersByEmail: customer_email => {
    return db.load(`select * from customer where customer_email = '${customer_email}'`);
  },
  add: entity => {
    return db.add('customer', entity);
  },

};
