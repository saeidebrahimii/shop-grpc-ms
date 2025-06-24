const bcrypt = require("bcrypt")
async function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 13);
  return hash;
}
async function compareHashPassword(password,hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}
module.exports={hashPassword,compareHashPassword}