const Workout = require('../Models/workout');

exports.createWorkout = async (req, res) => {
  try {
    const {
      workout_id,
      name,
      description,
      duration,
      difficulty,
      trainer_id,
      trainee_id, // הוספת trainee_id
      date,
      exercises
    } = req.body;

    const newWorkout = new Workout({
      workout_id,
      name,
      description,
      duration,
      difficulty,
      trainer_id,
      trainee_id, // שמירה של trainee_id
      date,
      exercises
    });

    await newWorkout.save();
    res.status(201).json({ message: 'Workout created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Workout creation failed' });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { workout_id, ...otherFieldsToUpdate } = req.body;

    const workout = await Workout.findOne({ workout_id });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    for (const field in otherFieldsToUpdate) {
      workout[field] = otherFieldsToUpdate[field];
    }

    await workout.save();
    res.status(200).json({ message: 'Workout updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Workout update failed' });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const { workout_id } = req.body;

    const result = await Workout.findOneAndDelete({ workout_id });
    if (!result) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Workout deletion failed' });
  }
};

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

exports.getWorkoutById = async (req, res) => {
  try {
    const { workout_id } = req.params;
    const workout = await Workout.findOne({ workout_id });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
};

exports.getWorkoutsByTrainerId = async (req, res) => {
  try {
    const { trainer_id } = req.params;
    const workouts = await Workout.find({ trainer_id });
    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ error: 'No workouts found for this trainer' });
    }
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

// פונקציה חדשה להצגת אימונים לפי ID של מתאמן
exports.getWorkoutsByTraineeId = async (req, res) => {
  try {
    const { trainee_id } = req.params;
    const workouts = await Workout.find({ trainee_id });
    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ error: 'No workouts found for this trainee' });
    }
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts for trainee' });
  }
};
