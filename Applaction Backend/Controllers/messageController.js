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

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Message creation failed' });
  }
};

// Update an existing message by ID
exports.updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const updatedMessage = await Message.findOneAndUpdate({ _id: messageId }, req.body, { new: true });

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message updated successfully', updatedMessage });
  } catch (error) {
    res.status(500).json({ error: 'Message update failed' });
  }
};

// Retrieve all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Retrieve a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findOne({ _id: messageId });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await Message.findOneAndDelete({ _id: messageId });

    if (!result) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Message deletion failed' });
  }
};

// Retrieve all messages for a specific recipient
exports.getMessagesForRecipient = async (req, res) => {
  try {
    const { recipientEmail } = req.params;
    // Find all messages where the recipient matches the provided email
    const messages = await Message.find({ recipient: recipientEmail });

    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'No messages found for the recipient' });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages for the recipient' });
  }
};





// Retrieve all messages for a specific recipient by ID
exports.getMessagesForRecipientById = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const messages = await Message.find({ receiver_ID_number: recipientId });

    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'No messages found for the recipient' });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages for recipient:', error); // Log the full error
    res.status(500).json({ error: 'Failed to fetch messages for the recipient' });
  }
};



exports.getMessagesBySender = async (req, res) => {
      try {
        const { senderEmail } = req.params;
    
        // Find all messages where the sender matches the provided email
        const messages = await Message.find({ sender: senderEmail });
    
        if (!messages || messages.length === 0) {
          return res.status(404).json({ error: 'No messages found sent by the sender' });
        }
    
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages sent by the sender' });
      }
    };


    // Import necessary libraries
const axios = require('axios');
const nodemailer = require('nodemailer');

// ... (previous imports and code)

// Function to send an email
const saveMessage = async (recipientEmail, message) => {
      try {
        const newMessage = new Message({
          sender: 'Support@example.com', // Your email address
          recipient: recipientEmail,
          content: message,
          status: 'saved', // You can set the status as needed
        });
        await newMessage.save();
        console.log(`Message saved for ${recipientEmail}`);
      } catch (error) {
        console.error(`Failed to save message for ${recipientEmail}: ${error}`);
      }
    };
    
    // Function to send emails to users based on their positions and create messages
    exports.sendEmailsAndCreateMessages = async (req, res) => {
      try {
        const { message } = req.body; // Extract the message from the request body
    
        // Fetch users from the external API
        const response = await axios.get('https://besmart-wms.onrender.com/user/get-all');
        const users = response.data;
    
        // Iterate through the users and save a message for each user
        for (const user of users) {
          if (user.position !== 'admin') {
            await saveMessage(user.email, message); // Save the message for each user
          }
        }
    
        res.status(200).json({ message: 'Messages saved successfully' });
      } catch (error) {
        console.error('Failed to fetch users or save messages:', error);
        res.status(500).json({ error: 'Failed to save messages' });
      }
    };