var db = require('../utils/db');
const TABLE_NAME= 'customer';
module.exports = {
  getAllCustomer: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },

};