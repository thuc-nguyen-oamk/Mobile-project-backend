var db = require("../utils/db");
const TABLE_NAME = "message";
module.exports = {
  getAllmessage: () => {
    return db.load(`select * from ${TABLE_NAME}`);
  },
  getAllMessagesOfAnUser: function (userId, callback) {
    return db.pool.query(
      `select * from ${TABLE_NAME}
       where sender_id = ${userId} or receiver_id = ${userId}
       order by message_created_at asc`,
      callback
    );
  },
  // A conversation consists of 2 partners
  getAllMessagesOfAConversation: function (userId, anotherId, callback) {
    return db.pool.query(
      `select * from ${TABLE_NAME}
      where (sender_id = ${userId} and receiver_id = ${anotherId}) or (sender_id = ${anotherId} and receiver_id = ${userId})
      order by message_created_at asc`,
      callback
    );
  },
  // A conversation consists of 2 partners
  getLastMessageOfAConversation: function (userId, anotherId, callback) {
    return db.pool.query(
      `select * from ${TABLE_NAME}
      where (sender_id = ${userId} and receiver_id = ${anotherId}) or (sender_id = ${anotherId} and receiver_id = ${userId})
      order by message_created_at desc limit 1`,
      callback
    );
  },
  // Only customers that have conversations with admin can be retrieved because the base table in db is the message table.
  getAllCustomersWithLastMessage: () => {
    return db.load(`select distinct sender_id as customer_id, customer_name, get_last_message(sender_id) as last_message,
    get_last_message_created_at(sender_id) as last_message_created_at
    from ${TABLE_NAME} left join customer on customer.customer_id = message.sender_id
    where customer_name is not null order by get_last_message_created_at(sender_id) desc`);
  },
  single: function (id) {
    return db.load(`select * from ${TABLE_NAME} where message_id = ${id}`);
  },
  add: function (entity) {
    return db.add(TABLE_NAME, entity);
  },
  patch: function (entity) {
    const condition = {
      message_id: entity.message_id,
    };

    delete entity.message_id;
    return db.patch(TABLE_NAME, entity, condition);
  },
  del: function (id) {
    const condition = {
      message_id: id,
    };
    return db.del(TABLE_NAME, condition);
  },
  available: function (message_name) {
    return db.load(`select * from ${TABLE_NAME} where message_name = "${message_name}"`);
  },
};
