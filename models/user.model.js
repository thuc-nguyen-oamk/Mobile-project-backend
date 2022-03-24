var db = require('../utils/db');
const TBL_CATEGORIES = 'users';
module.exports = {
  all: () => {
    return db.load('select * from users');
  },

};