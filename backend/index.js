const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const userRoutes = require("./routes/Userroute");
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

const db = async () => {
  console.log("db");
  try {
    const connect = await mongoose.connect(process.env.mongoDB_URL);
    console.log(`connected successfully ${connect.connection.host}`);
  } catch (error) {
    console.log(`error is ${error}`);
  }
};

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db();
});
