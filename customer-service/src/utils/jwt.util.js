const jwt = require("jsonwebtoken");
const config = require("../config/config");

function generateJwtToken(payload) {
  const access_token = jwt.sign(
    payload,
    Buffer.from(config.app.jwt.access_secret_token, "base64").toString(),
    { expiresIn: "2w" }
  );
  const refresh_token = jwt.sign(
    payload,
    Buffer.from(config.app.jwt.refresh_secret_token, "base64").toString(),
    { expiresIn: "8w" }
  );
  return { access_token, refresh_token };
}

function verifyJwtToken(token, type = "access") {
  const secret = Buffer.from(
    type === "access"
      ? config.app.jwt.access_secret_token
      : config.app.jwt.refresh_secret_token,
    "base64"
  ).toString();

  return jwt.verify(token, secret);
}

module.exports = { generateJwtToken, verifyJwtToken };
