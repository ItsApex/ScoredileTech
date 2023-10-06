const mongoose = require("mongoose");

// Define a Mongoose schema for the user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
