const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./configs/mongoose.config");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const newsRoutes = require("./routes/newsRoutes");
const admin = require("./configs/firebase.config");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.54:5173",
  "https://nok.web.app",
  "https://admin-nok.web.app",
  "https://noktest--test-lpvpksko.web.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/news",newsRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
