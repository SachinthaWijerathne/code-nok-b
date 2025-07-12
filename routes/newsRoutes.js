const express = require('express');
const router = express.Router();
const {
  addNews,
  updateNews,
  getNews,
  getAllNews,
  deleteNews,
} = require('../controllers/newsControllers');
const { verifyFirebaseToken } = require('../middlewares/verifyFirebaseToken');
const { verifyRole } = require('../middlewares/verifyRole');
//everyone
router.get('/:id', getNews);
router.get('/', getAllNews);

//protected
router.post('/', verifyFirebaseToken, verifyRole(['dev', 'ceo']), addNews);
router.put('/:id', verifyFirebaseToken, verifyRole(['dev', 'ceo']), updateNews);
router.delete('/:id', verifyFirebaseToken, verifyRole(['dev', 'ceo']), deleteNews);

module.exports = router;