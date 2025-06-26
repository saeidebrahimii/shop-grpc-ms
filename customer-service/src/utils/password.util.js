const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 13);
  return hash;
}

async function compareHashPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, compareHashPassword };
