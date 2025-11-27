const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const httpCode = require('../helper/HttpCode')

const hashedPassword = (password) => {
  const salt = 10;
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};
const comparePassword = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
};
const AuthCheck = (req, res, next) => {
  const rawToken = req.headers["x-access-token"];

  if (!rawToken || typeof rawToken !== "string" || rawToken.trim() === "") {
    return res.status(httpCode.badRequest || 400).json({
      status: false,
      message: "Please login to get access",
    });
  }

  try {
    const decoded = jwt.verify(rawToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    if(req.user.isAdmin === false){
      res.status(httpCode.badRequest || 400).json({
      status: false,
      message: "You don't have access",
    });
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(httpCode.unauthorized || 401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};
module.exports = { hashedPassword, comparePassword, AuthCheck };
