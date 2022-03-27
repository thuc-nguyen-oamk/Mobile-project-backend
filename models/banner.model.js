var db = require('../utils/db');
const TABLE_NAME= 'banner';
module.exports = {
  getAllBanner: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  addNew: (entity) => {
    return db.add(TABLE_NAME,entity);
  },
  delete: (banner_id) =>{
    return db.del(TABLE_NAME,banner_id);
  }
};