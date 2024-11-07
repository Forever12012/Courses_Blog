const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS
const courseRoutes = require("./courseRoute");
const blogRoutes = require("./blogRoute");
const paymentRoutes = require("./paymentRoute");

require("dotenv").config();

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for all origins (you can customize this as needed)
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Use the course routes
app.use("/courses", courseRoutes);
app.use("/blogs", blogRoutes);
app.use("/payment", paymentRoutes);

// Set the port for the server to listen on
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
