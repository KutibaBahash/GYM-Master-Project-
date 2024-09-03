const express = require('express');
const router = express.Router();
const workoutController = require('../Controllers/workoutController');

router.post('/create', workoutController.createWorkout);
router.put('/update', workoutController.updateWorkout);
router.delete('/delete', workoutController.deleteWorkout);
router.get('/get-all', workoutController.getAllWorkouts);
router.get('/get-by-id/:workout_id', workoutController.getWorkoutById);
router.get('/get-by-trainer-id/:trainer_id', workoutController.getWorkoutsByTrainerId);
router.get('/get-by-trainee-id/:trainee_id', workoutController.getWorkoutsByTraineeId); // הנתיב החדש

module.exports = router;
