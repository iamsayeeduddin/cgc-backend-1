const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bunyan = require("bunyan");
const path = require("path");

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

const apploggerPath = path.join(__dirname, "..", "logs", "app.log");

const applogger = bunyan.createLogger({
  name: "ecomLogger",
  streams: [{ path: apploggerPath }],
});

module.exports = {
  applogger,
  hashPassword,
  generateToken,
  comparePassword,
  responseObjGenerator,
};
