const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_ID_number: {
    type: Number,
    required: true
  },
  receiver_ID_number: {
    type: Number,
    required: true
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'Trainer']
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'Trainer']
  },
  time: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
