var db = require('../utils/db');
const TABLE_NAME= 'voucher';
module.exports = {
  getAll: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },

};