const jwt = require("jsonwebtoken");
const config = require("../config/config");
async function generateJwtToken(payload) {
  const access_token = jwt.sign(
    payload,
    Buffer.from(config.app.jwt.access_secret_token, "base64").toString(),
    {
      expiresIn: "2w",
    }
  );
  const refresh_token = jwt.sign(
    payload,
    Buffer.from(config.app.jwt.refresh_secret_token, "base64").toString(),
    { expiresIn: "8w" }
  );
  return { access_token, refresh_token };
}
async function verifyJwtToken(token) {
  const decoded = jwt.verify(
    token,
    Buffer.from(config.app.jwt.access_secret_token, "base64").toString()
  );
  return decoded;
}
module.exports = { generateJwtToken,verifyJwtToken };
