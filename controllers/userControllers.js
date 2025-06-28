const User = require("../models/User");
const admin = require("../configs/firebase.config");

// ✅ Verify Firebase token & create user if not exists
const verifyUser = async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decoded;
    const { displayName } = req.body;

    let user = await User.findOne({ uid });

    if (!user) {
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

// ✅ Get all users
const getUserlist = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Signup a new user (if not already in DB)
const signupUser = async (req, res) => {
  try {
    const { name, email, uid, role = "Guest", isApproved = false } = req.body;

    if (!name || !email || !uid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await User.findOne({ uid });
    if (existing) return res.status(200).json(existing);

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

// ✅ Get user by UID
const getUserByUID = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update user by UID
const updateUser = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete user by UID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ uid: req.params.uid });
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  verifyUser,
  getUserlist,
  signupUser,
  getUserByUID,
  updateUser,
  deleteUser,
};
