var db = require("../utils/db");
const TABLE_NAME = "category";
module.exports = {
  getAllCategory: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  all: function () {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  single: function (id) {
    return db.load(`select * from ${TABLE_NAME} where category_id = ${id}`);
  },
  add: function (entity) {
    return db.add(TABLE_NAME, entity);
  },
  patch: function (entity) {
    const condition = {
      category_id: entity.category_id,
    };

    delete entity.category_id;
    return db.patch(TABLE_NAME, entity, condition);
  },
  del: function (id) {
    const condition = {
      category_id: id,
    };
    return db.del(TABLE_NAME, condition);
  },
  available: function (category_name) {
    return db.load(`select * from ${TABLE_NAME} where category_name = "${category_name}"`);
  },
};
