const express = require('express');
const router = express.Router();
const {
  addGame,
  updateGame,
  getGame,
  getAllGames,
  deleteGame,
} = require('../controllers/gameControllers');

router.post('/', addGame);
router.put('/:id', updateGame);
router.get('/:id', getGame);
router.get('/', getAllGames);
router.delete('/:id', deleteGame);

module.exports = router;