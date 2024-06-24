const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ID_number: Number,
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  encrypted_password: String,
  birth_date: Date,
  joining_date: Date,
  payment:Number,
  trainer: String,
  age: Number,
  hight: Number,
  Weght: Number,
  status:Boolean,
  verfcationCode: String,


});

const User = mongoose.model('user', userSchema);

module.exports = User;
