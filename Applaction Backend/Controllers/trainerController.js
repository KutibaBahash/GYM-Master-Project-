const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Trainer = require('../Models/trainer'); // Changed import
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const {
      ID_number,
      first_name,
      last_name,
      phone_number,
      email,
      password,
      birth_date,
      joining_date,
      payment,
      trainer,
      age,
      height,
      weight,
      status,
      verificationCode,
      traineesArray
    } = req.body;
    
    const existingTrainer = await Trainer.findOne({ email });

    if (existingTrainer) {
      return res.status(400).json({ error: 'Trainer with this email already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newTrainer = new Trainer({
      ID_number,
      first_name,
      last_name,
      phone_number,
      email,
      encrypted_password: encryptedPassword,
      birth_date,
      joining_date,
      payment,
      trainer,
      age,
      height,
      weight,
      status,
      verificationCode,
      traineesArray
    });

    await newTrainer.save();
    res.status(201).json({ message: 'Trainer registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ email: req.body.email });
    if (!trainer) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      trainer.encrypted_password
    );

    if (!validPassword) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    res.status(200).json({ trainer }); // Include only the trainer data in the response
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.updateTrainerProfile = async (req, res) => {
  try {
    const { email, password, ...otherFieldsToUpdate } = req.body;

    // Check if the trainer exists
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // Update fields
    if (password) {
      trainer.encrypted_password = await bcrypt.hash(password, 10);
    }
    for (const field in otherFieldsToUpdate) {
      trainer[field] = otherFieldsToUpdate[field];
    }

    await trainer.save();
    res.status(200).json({ message: 'Trainer profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Trainer profile update failed' });
  }
};

exports.deleteTrainer = async (req, res) => {
  try {
    const { email } = req.body;

    // Delete the trainer
    const result = await Trainer.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Trainer deletion failed' });
  }
};

exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
};

exports.getTrainerByIdNumber = async (req, res) => {
  try {
    const { ID_number } = req.params;
    const trainer = await Trainer.findOne({ ID_number });
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainer' });
  }
};
