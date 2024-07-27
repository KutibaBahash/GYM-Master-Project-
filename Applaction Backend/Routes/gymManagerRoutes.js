const express = require('express');
const router = express.Router();
const gymManagerController = require('../Controllers/gymManagerController');

router.post('/register', gymManagerController.register);
router.post('/login', gymManagerController.login);
router.put('/update-profile', gymManagerController.updateProfile);
router.delete('/delete-manager', gymManagerController.deleteManager);
router.get('/get-all', gymManagerController.getAllManagers);
router.get('/get-by-id-number/:ID_number', gymManagerController.getManagerByIdNumber);

module.exports = router;
