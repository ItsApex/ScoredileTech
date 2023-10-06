const express = require("express");
const router = express.Router();
const User = require("../models/users"); // Import the User model


router.post("/register", async (req, res) => {
    try {
      // Extract user data from the request body
      console.log('register field')
      const { name, email, password, phoneNumber } = req.body;
  
      // Create a new user document using the User model
      const newUser = new User({
        name,
        email,
        password, // You should hash and salt the password in a production app
        phoneNumber,
      });
  
      // Save the user document to the database
      await newUser.save();
  
      // Respond with a success message
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      // Handle errors and respond with an error message
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });


  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username and password (you should hash and salt passwords in a production app)
      const user = await User.findOne({ username, password });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // You can generate a JWT token here for authentication if needed
      // const token = generateToken(user);
  
      // Respond with a success message and token
      res.status(200).json({ message: "Login successful", user /*, token */ });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });



  
module.exports = router
  
