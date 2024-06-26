/*
const verifyToken = require('./verifyToken');
const authMiddleware = (req, res, next) => {
  verifyToken(req, res, next);
};
module.exports = authMiddleware; 

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send("Token wird zur Authentifizierung benötigt");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send("Token ist invalide");
  }

  return next();
};

module.exports = verifyToken;*/
