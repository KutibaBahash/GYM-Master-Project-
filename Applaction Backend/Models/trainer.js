const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  ID_number: Number,
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  encrypted_password: String,
  birth_date: Date,
  joining_date: Date,
  payment:Number,
  verfcationCode: String,
  age: Number,
  hight: Number,
  Weght: Number,
  status:Boolean,

});

const Trainer = mongoose.model('trainer', trainerSchema);

module.exports = Trainer;
