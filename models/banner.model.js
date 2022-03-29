var db = require('../utils/db');
const TABLE_NAME= 'banner';
module.exports = {
  getAll: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  add: (entity) => {
    return db.add(TABLE_NAME,entity);
  },
  delete: (condition) => {
    return db.del(TABLE_NAME,condition);
  },
};