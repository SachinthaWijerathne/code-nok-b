const express=require('express')
const router=express.Router()

// ✅ Controllers imported
const {
  getUserlist,
  signupUser,
  verifyUser,
  getUserByUID,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { verifyFirebaseToken } = require('../middlewares/verifyFirebaseToken');

// ✅ Middleware added to protected routes
router.get("/", verifyFirebaseToken, getUserlist);
router.get('/:uid', verifyFirebaseToken, getUserByUID);
router.put('/:uid', verifyFirebaseToken, updateUser);
router.delete('/:uid', verifyFirebaseToken, deleteUser);
router.post("/signup", verifyFirebaseToken, signupUser);

// ✅ Public route for initial verification/login
router.post("/verify", verifyUser);

module.exports =router;