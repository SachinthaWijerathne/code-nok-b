const User = require("../models/User");

const verifyRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const uid = req.user?.uid;

      if (!uid) {
        return res.status(401).json({ message: "No UID found in token" });
      }

      const userdb = await User.findOne({ uid });

      if (!userdb || !allowedRoles.includes(userdb.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Optionally attach DB user to req for downstream use
      req.user.role = userdb.role;

      next();
    } catch (error) {
      console.error("Role verification error:", error);
      return res.status(500).json({ message: "Server error during role verification" });
    }
  };
};

module.exports = { verifyRole };
