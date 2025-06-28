// middlewares/verifyFirebaseToken.js
const admin = require('../configs/firebase.config');

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // You can access req.user in routes
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });

  }
};

module.exports = verifyFirebaseToken;
