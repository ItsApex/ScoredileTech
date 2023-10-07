const mongoose = require("mongoose");
const User = require('./users'); // Import the User model

const disasterSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    // required: true,
  },
  longitude: {
    type: Number,
    // required: true,
  },
  alertName: {
    type: String,
    // required: true,
  },
  alertDescription :{
    type : String,
    // required : true
  },
  alertSeverity: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    default: "Man-made", // Default to "Man-made" for the type field
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Disaster = mongoose.model("Disaster", disasterSchema);

module.exports = Disaster;
