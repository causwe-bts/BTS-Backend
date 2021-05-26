const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderInfo = new Schema({
  menu_id: String,
  quantity: Number,
});

const Order = new Schema({
  order_id: String,
  orderer: String,
  order: [OrderInfo],
  datetime: {
    type: Date,
    default: Date.now,
  },
  status: String,
});

// create new User document
Order.statics.create = function (orderInfo) {
  const { order_id, orderer, order, status } = orderInfo;

  const newOrder = new this({
    order_id: order_id,
    orderer: orderer,
    order: order,
    status: status,
  });

  return newOrder.save();
};

// find all menus
Order.statics.findByUserName = function (orderer) {
  return this.find({ orderer }).exec();
};

module.exports = mongoose.model('Order', Order);
