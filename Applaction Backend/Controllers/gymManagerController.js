const bcrypt = require('bcrypt');
const GymManager = require('../Models/gymManager');
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
          status // Include status in destructuring
        } = req.body;
    
        const existingManager = await GymManager.findOne({ email });
    
        if (existingManager) {
          return res.status(400).json({ error: 'Manager with this email already exists' });
        }
    
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        const newManager = new GymManager({
          ID_number,
          first_name,
          last_name,
          phone_number,
          email,
          encrypted_password: encryptedPassword,
          birth_date,
          joining_date,
          status // Include status when creating new manager
        });
    
        await newManager.save();
        res.status(201).json({ message: 'Gym Manager registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
      }
    };

exports.login = async (req, res) => {
  try {
    const manager = await GymManager.findOne({ email: req.body.email });
    if (!manager) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const validPassword = await bcrypt.compare(req.body.password, manager.encrypted_password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Authentication failed' });
      
    }

    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email, password, ...otherFieldsToUpdate } = req.body;

    const manager = await GymManager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    if (password) {
      manager.encrypted_password = await bcrypt.hash(password, 10);
    }
    for (const field in otherFieldsToUpdate) {
      manager[field] = otherFieldsToUpdate[field];
    }

    await manager.save();
    res.status(200).json({ message: 'Manager profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Profile update failed' });
  }
};

exports.deleteManager = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await GymManager.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

exports.getAllManagers = async (req, res) => {
  try {
    const managers = await GymManager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch managers' });
  }
};

exports.getManagerByIdNumber = async (req, res) => {
  try {
    const { ID_number } = req.params;
    const manager = await GymManager.findOne({ ID_number });
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manager' });
  }
};
