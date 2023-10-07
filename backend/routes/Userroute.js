const express = require("express");
const router = express.Router();
const User = require("../models/users"); // Import the User model
const accountSid = 'ACb46a3608f2e4fb4c0b944ca2529a46b8';
const authToken = 'a8b10e8acbac965c182251c4b232c1b8';
const client = require('twilio')(accountSid, authToken);

router.post("/sendmessage", async (req, res) => {
  const numbers = ['+919324284054', '+918591537048', '+917373737373','+917977255640'];
  const { message } = req.body;

  try {
    const successfulNumbers = [];
    const failedNumbers = [];

    for (const number of numbers) {
      try {
        await client.messages.create({
          body: message,
          from: '+12564742235',
          to: number,
        });
        successfulNumbers.push(number);
      } catch (error) {
        console.error(`Error sending message to ${number}:`, error);
        failedNumbers.push(number);
      }
    }

    console.log('Messages sent successfully to:', successfulNumbers);
    console.log('Messages failed to send to:', failedNumbers);

    res.status(200).json({
      message: "Messages sent successfully",
      successfulNumbers,
      failedNumbers,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Message sending failed", error });
  }
});



  
    // .then(message => console.log(message.sid))
    // .then((message) => {
    //   console.log('Message has been sent:');
    //   res.status(200).json({ message: "Message sent successfully" });
    // })
    // // .done()
    // .catch((err) => {
    //   console.error('There was an error:', err);
    //   res.status(500).json({ error: "Message sending failed",err });
    // });
// });

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
      console.log(username)
      console.log(password)
  
      // Find the user by username and password (you should hash and salt passwords in a production app)
      const user = await User.findOne({ name : username, password : password });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // You can generate a JWT token here for authentication if needed
      // const token = generateToken(user);
  
      // Respond with a success message and token
      res.status(200).json({ message: "Login successful", user , userId: user._id });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });



  
module.exports = router
  
