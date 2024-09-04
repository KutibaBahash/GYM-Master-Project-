  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const User = require('../Models/user'); // Correct import
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
                height,
                weight,
                status,
                verificationCode
              } = req.body;
          

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
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
        height,
        weight,
        status,
        verificationCode
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed'+console.log(error) });
    }
  };

  exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.encrypted_password
      );

      if (!validPassword) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      res.status(200).json({ user }); // Include only the user data in the response
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  };

  exports.updateUserProfile = async (req, res) => {
    try {
      const { email, password, ...otherFieldsToUpdate } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update fields
      if (password) {
        user.encrypted_password = await bcrypt.hash(password, 10);
      }
      for (const field in otherFieldsToUpdate) {
        user[field] = otherFieldsToUpdate[field];
      }

      await user.save();
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User profile update failed' });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const { email } = req.body;

      // Delete the user
      const result = await User.findOneAndDelete({ email });
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User deletion failed' });
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  exports.getUserByIdNumber = async (req, res) => {
    try {
      const { ID_number } = req.params;
      const user = await User.findOne({ ID_number });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };
// New function to get users with trainer verification code
exports.getUsersByTrainerVerificationCode = async (req, res) => {
  try {
    const { verificationCode } = req.params;
    console.log('Received verification code:', verificationCode); // Log the incoming code

    const users = await User.find({ verificationCode });
    console.log('Users found:', users); // Log the users found, if any

    if (!users || users.length === 0) {
      console.log('No trainees found for the given verification code.');
      return res.status(404).json({ error: 'No trainees found for this verification code.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by verification code:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
