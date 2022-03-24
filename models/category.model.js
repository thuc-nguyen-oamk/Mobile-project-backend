var db = require('../utils/db');
const TABLE_NAME= 'category';
module.exports = {
  getAllCategory: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },

};