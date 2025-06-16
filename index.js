const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./configs/mongoose.config');
const client = require('./configs/mongodb.config')
const userRoutes = require('./routes/UserRoutes');
const gameRoutes=require('./routes/gameRoutes')

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/site/games/',gameRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
