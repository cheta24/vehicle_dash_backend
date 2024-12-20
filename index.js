const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware for Cross-Origin Resource Sharing

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema with Validation
const vehicleSchema = new mongoose.Schema({
  motorRPM: {
    type: Number,
    required: true,
  },
  parkingBreakIndicator: {
    type: Boolean,
    default: false,
  },
  checkEngineIndicator: {
    type: Boolean,
    default: false,
  },
  motorStatusIndicator: {
    type: Boolean,
    default: false,
  },
  batteryPercentage: {
    type: Number,
    default: 100, // Default value if not provided
  },
  batteryTemperature: {
    type: Number,
    default: 25, // Default value if not provided
  },
  isCharging: {
    type: Boolean,
    required: true,
  },
  powerConsumption: {
    type: Number,
    default: 0, // Default value if not provided
  },
  gearRatio: {
    type : Number,
    default: 1
  }
});

// Create a Vehicle Model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Seed Database (Ensure it's only seeded once)
const seedDatabase = async () => {
  try {
    const data = await Vehicle.findOne({});
    if (!data) {
      await Vehicle.create({
        motorRPM: 0,
        parkingBreakIndicator: false,
        checkEngineIndicator: false,
        motorStatusIndicator: false,
        gearRatio: 1,
        batteryPercentage: 100,
        batteryTemperature: 25,
        isCharging: false,
        powerConsumption: 0,
      });
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();

// API Endpoints
app.get("/api/vehicle-data", async (req, res) => {
  try {
    const data = await Vehicle.findOne({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/api/update", async (req, res) => {
  console.log("Received body:", req.body); // Debug log to check the received body
  try {
    const updates = req.body;
    const updatedData = await Vehicle.findOneAndUpdate({}, updates, { new: true });
    if (!updatedData) {
      return res.status(404).json({ error: "No data found to update" });
    }
    res.json(updatedData);
  } catch (err) {
    console.error("Error:", err); // Log error for debugging
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
