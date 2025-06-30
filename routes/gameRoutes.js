const express = require('express');
const router = express.Router();
const {
  addGame,
  updateGame,
  getGame,
  getAllGames,
  deleteGame,
} = require('../controllers/gameControllers');
const { verifyFirebaseToken } = require('../middlewares/verifyFirebaseToken');
const { verifyRole } = require('../middlewares/verifyRole');
//everyone
router.get('/:id', getGame);
router.get('/', getAllGames);

//protected
router.post('/', verifyFirebaseToken, verifyRole(['dev', 'ceo']), addGame);
router.put('/:id', verifyFirebaseToken, verifyRole(['dev', 'ceo']), updateGame);
router.delete('/:id', verifyFirebaseToken, verifyRole(['dev', 'ceo']), deleteGame);

module.exports = router;