const express = require("express");
const router = express.Router();
const User = require("../models/users"); // Import the User model


router.post("/register", async (req, res) => {
    try {
      // Extract user data from the request body
      console.log('regiter field')
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



  
module.exports = router
  
