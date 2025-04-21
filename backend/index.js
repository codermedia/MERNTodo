const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Starting the express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });
