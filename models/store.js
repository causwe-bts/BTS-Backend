const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema({
  name: String,
  time: String,
  location: String,
});

module.exports = mongoose.model('Store', Store);
