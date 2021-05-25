const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema({
  name: String,
  time: String,
  location: String,
});
Store.statics.findOneByStatus = function (_status) {
  return this.findOne({
    status: _status,
  }).exec();
};
module.exports = mongoose.model('Store', Store);
