var db = require('../utils/db');
const TABLE_NAME= 'order';
module.exports = {
  getAllOrder: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },

};