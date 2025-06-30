const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./configs/mongoose.config");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const admin = require("./configs/firebase.config");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
const allowed=[
  "http://localhost:5173"
]

app.use(cors({
  origin:allowed,
  credentials:true
}));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
