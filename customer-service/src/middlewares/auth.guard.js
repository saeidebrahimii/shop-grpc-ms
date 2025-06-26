const { verifyJwtToken } = require("../utils/jwt.util");

async function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ msg: "Token not provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
}
module.exports = { authGuard };
