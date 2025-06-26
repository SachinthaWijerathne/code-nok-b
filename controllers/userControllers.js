const User=require('../models/User')

const verifyUser=(req, res) => {
  res.json({
    message: 'User authenticated',
    uid: req.user.uid,
    email: req.user.email,
  });
}

const getUserlist=async (req, res) => {
  const users = await User.find();
  res.json(users);
}

const signupUser=async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports={
    getUserlist,
    signupUser,
    verifyUser
}