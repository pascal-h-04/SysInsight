/*const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).send("Token wird zur Authentifizierung benötigt");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return res.status(403).send("Admin-Zugriff erforderlich");
    }
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send("Token ungültig");
  }
  next();
};

module.exports = verifyAdminToken; */
