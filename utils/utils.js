const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseObjGenerator = (success, message, data) => {
  let resObj = {};
  resObj.success = success;
  resObj.message = message || (success ? "Successful!" : "Failed!");
  if (data) {
    resObj.data = data;
  }
  return resObj;
};

const hashPassword = (plainPass) => {
  return bcrypt.hash(plainPass, 2);
};

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
};

module.exports = {
  hashPassword,
  generateToken,
  comparePassword,
  responseObjGenerator,
};
