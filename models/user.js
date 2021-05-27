const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const config = require('../config');

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// create new User document
User.statics.create = function (username, password, phonenumber) {
  const encrypted = crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64');

  const user = new this({
    username,
    password: encrypted,
    phonenumber,
  });

  // return the Promise
  return user.save();
};

// find one user by using username
User.statics.findOneByUsername = function (username) {
  return this.findOne({
    username,
  }).exec();
};

// verify the password of the User documment
User.methods.verify = function (password) {
  const encrypted = crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64');

  return this.password === encrypted;
};

User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', User);
