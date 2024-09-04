const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');

router.post('/send', messageController.sendMessage);
router.post('/create', messageController.createMessage);
router.put('/update/:messageId', messageController.updateMessage);
router.get('/get-all', messageController.getAllMessages);
router.get('/get/:messageId', messageController.getMessageById);
router.delete('/delete/:messageId', messageController.deleteMessage);
router.get('/recipient/:recipientEmail', messageController.getMessagesForRecipient);
router.get('/sender/:senderEmail', messageController.getMessagesBySender);
router.post('/send-emails-and-create-messages', messageController.sendEmailsAndCreateMessages);

router.get('/getMessagesForRecipientById/:recipientId', messageController.getMessagesForRecipientById);

router.get('/recipient/:recipientId', messageController.getMessagesForRecipientById);

module.exports = router;
