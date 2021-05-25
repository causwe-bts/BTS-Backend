const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
  name: String,
  description: String,
  price: Number,
  imgURL: String,
});

// create new User document
Menu.statics.create = function (menuItem) {
  const { name, description, price, imgURL } = menuItem;

  const menu = new this({
    name: name,
    description: description,
    price: price,
    imgURL: imgURL,
  });
  // return the Promise
  return menu.save();
};

// find all menus
Menu.statics.findMenus = function (option) {
  return this.find({ option }).exec();
};

// find one user by using username
Menu.statics.findOneByMenuname = function (name) {
  return this.findOne({
    name,
  }).exec();
};

module.exports = mongoose.model('Menu', Menu);
