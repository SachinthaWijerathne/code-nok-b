const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  playerList: [String],
  monthlyStars: {
    jan: Number,
    feb: Number,
    mar: Number,
    // add more if needed
  },
  playerCount: Number,
  platform: String, // e.g., 'pc', 'mobile'
});

module.exports = mongoose.model('Game', gameSchema);
