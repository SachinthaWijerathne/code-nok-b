const Game = require("../models/Game");

const getGamelist = async (req, res) => {
  const games = await Game.find();
  res.json(games);
};

const addGamelist=async(req,res)=>{
try {
    const newGame = new Game(req.body);
    const saved = await newGame.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getGamelist,
  addGamelist
};
