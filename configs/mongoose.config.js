const mongoose = require('mongoose');

const connectDB = async () => {
const u=process.env.DB_U;
const p=process.env.DB_P;
const c=process.env.DB_C;
const db=process.env.DB_DB;

  try {
    await mongoose.connect(`mongodb+srv://${u}:${p}@${c}.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
