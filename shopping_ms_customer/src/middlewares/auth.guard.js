const { verifyJwtToken } = require("../utils/jwt.util");

async function authGuard(req, res, next) {
  const { api_key } = req?.headers;
  if (!api_key) return res.status(401).json({ msg: "api_key not provided" });
  try {
    const decoded = await verifyJwtToken(api_key);
    res.json({ valid: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
}
module.exports = { authGuard };
