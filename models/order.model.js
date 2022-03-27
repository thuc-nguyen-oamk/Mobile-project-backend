var db = require('../utils/db');
var config = require('../config/default.json')
const TABLE_NAME= 'order';
module.exports = {
  get: () => {
    return db.load(`select * from ${config.mysql.database}.${TABLE_NAME}`);
  },
  add: (entity) => {
    return db.add(TABLE_NAME,entity);
  },
  delete: (condition) => {
    return db.del(TABLE_NAME,condition);
  },
};