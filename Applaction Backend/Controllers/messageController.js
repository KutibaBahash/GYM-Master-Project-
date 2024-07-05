const Message = require('../Models/message');
const User = require('../Models/user');
const Trainer = require('../Models/trainer');

exports.sendMessage = async (req, res) => {
  try {
    const { sender_ID_number, receiver_ID_number, content, senderModel, receiverModel } = req.body;

    if (!['User', 'Trainer'].includes(senderModel) || !['User', 'Trainer'].includes(receiverModel)) {
      return res.status(400).json({ error: 'Invalid sender or receiver model' });
    }

    const sender = senderModel === 'User' ? await User.findOne({ ID_number: sender_ID_number }) : await Trainer.findOne({ ID_number: sender_ID_number });
    const receiver = receiverModel === 'User' ? await User.findOne({ ID_number: receiver_ID_number }) : await Trainer.findOne({ ID_number: receiver_ID_number });

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    const newMessage = new Message({
      sender_ID_number,
      receiver_ID_number,
      senderModel,
      receiverModel,
      content
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
