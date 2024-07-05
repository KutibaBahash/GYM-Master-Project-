const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workout_id: Number,
  name: String,
  description: String,
  duration: Number, // in minutes
  difficulty: String, // e.g., easy, medium, hard
  trainer_id: Number,
  date: Date,
  exercises: Array, // Array of exercises involved in the workout
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
