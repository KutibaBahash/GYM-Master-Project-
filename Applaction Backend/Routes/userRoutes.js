const express = require('express');
const router = express.Router();
const authController = require('../Controllers/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update-profile', authController.updateUserProfile); 
router.delete('/delete-user', authController.deleteUser);
router.get('/get-all', authController.getAllUsers);
router.get('/get-by-id-number/:ID_number', authController.getUserByIdNumber);
router.get('/get-by-verification-code/:verificationCode', authController.getUsersByTrainerVerificationCode);



module.exports = router;
