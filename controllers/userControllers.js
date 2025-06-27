const User = require("../models/User");
const admin = require("../configs/firebase.config");

const verifyUser = async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(idToken);

    const { uid, email } = decoded;
    const { displayName } = req.body;

    // Check if user exists in DB
    let user = await User.findOne({ uid });
    if (!user) {
      // Create if not exists
      user = new User({
        uid,
        email,
        name: displayName || "User",
        role: "Guest",
        isApproved: false,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ error: "Invalid token" });
  }
};

const getUserlist = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const signupUser = async (req, res) => {
  try {
    const { name, email, uid, role = "Guest", isApproved = false } = req.body;

    if (!name || !email || !uid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existing = await User.findOne({ uid });
    if (existing) {
      return res.status(200).json(existing);
    }

    // Create new user in DB
    const newUser = new User({
      name,
      email,
      uid,
      role,
      isApproved,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserlist,
  signupUser,
  verifyUser,
};
