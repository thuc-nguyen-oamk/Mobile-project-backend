var db = require('../utils/db');
const DB_NAME = "eshopmb"
const TABLE_NAME= 'admin';
module.exports = {
  getAlladmin: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  register:(adminInfo) => {
    return db.add(TABLE_NAME, adminInfo);
  },
  getAdminsByEmail: admin_email => {
    return db.load(`select * from admin where admin_email = '${admin_email}'`);
  },
  add: entity => {
    return db.add('admin', entity);
  },
  

};
