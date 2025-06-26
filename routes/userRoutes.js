const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const {
  getUserlist,
  signupUser,
  verifyUser,
} = require("../controllers/userControllers");

// Verify Firebase token
router.post("/verify", verifyFirebaseToken, verifyUser);

// Get all users (protected)
router.get("/", verifyFirebaseToken, getUserlist);

router.post("/signup", verifyFirebaseToken, signupUser);

module.exports = router;
