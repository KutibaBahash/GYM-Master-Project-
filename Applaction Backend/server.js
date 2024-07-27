const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./Config/db");
const userRoutes = require("./Routes/userRoutes");
const trainerRoutes = require("./Routes/trainerRoutes");
const workoutRoutes = require("./Routes/workoutRoutes");
const messageRoutes = require("./Routes/messageRoutes"); 
const gymManagerRoutes = require("./Routes/gymManagerRoutes");



require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());

app.use("/user", userRoutes); // regular user 
app.use("/trainer", trainerRoutes); // regular user 
app.use("/workout", workoutRoutes); // workout routes
app.use("/message", messageRoutes); // message routes
app.use("/gym-manager", gymManagerRoutes); // gym manager routes



const PORT =  3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
