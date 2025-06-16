const express = require('express');
const { getGamelist,addGamelist } = require('../controllers/gameControllers');
const router = express.Router();

// Route: GET /api/site/gamelist/pc
router.get('/gamelist', getGamelist);
router.post('/gamelist',addGamelist)

module.exports=router;
