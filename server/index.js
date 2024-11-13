// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant'); // Assuming you have a separate Restaurant model

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, usertype, password, restaurantAddress, restaurantImage } = req.body;
  
  // Validate required fields
  if (!username || !email || !usertype || !password) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize new user
    const newUser = new User({
      username,
      email,
      usertype,
      password: hashedPassword,
      approval: usertype === 'restaurant' ? 'pending' : 'approved',
    });

    // Save user and create restaurant data if user is restaurant
    const user = await newUser.save();

    if (usertype === 'restaurant') {
      const restaurant = new Restaurant({
        ownerId: user._id,
        title: username,
        address: restaurantAddress,
        mainImg: restaurantImage,
      });
      await restaurant.save();
    }

    // Respond with success and user data (without sensitive info)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      usertype: user.usertype,
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
