const express = require('express');
const router = express.Router();
const trainerController = require('../Controllers/trainerController'); 

router.post('/register', trainerController.register);
router.post('/login', trainerController.login);
router.put('/update-profile', trainerController.updateTrainerProfile); 
router.delete('/delete-trainer', trainerController.deleteTrainer);
router.get('/get-all', trainerController.getAllTrainers);
router.get('/get-by-id-number/:ID_number', trainerController.getTrainerByIdNumber);

module.exports = router;
