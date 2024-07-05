const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const userRoutes = require("./Routes/userRoutes");
const trainerRoutes = require("./Routes/trainerRoutes");
const workoutRoutes = require("./Routes/workoutRoutes"); // Add workout routes

const app = express();
app.use(bodyParser.json());

app.use("/user", userRoutes); 
app.use("/trainer", trainerRoutes); 
app.use("/workout", workoutRoutes); // Use workout routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
