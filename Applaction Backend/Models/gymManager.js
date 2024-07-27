const mongoose = require('mongoose');

const gymManagerSchema = new mongoose.Schema({
  ID_number: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  encrypted_password: { type: String, required: true },
  birth_date: { type: Date, required: true },
  joining_date: { type: Date, required: true },
  role: { type: String, default: 'gymManager' },
  status: { type: Boolean, default: true, required: true }
});

module.exports = mongoose.model('GymManager', gymManagerSchema);
