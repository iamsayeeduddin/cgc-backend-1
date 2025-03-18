const bcrypt = require("bcrypt");

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

module.exports = {
  hashPassword,
  comparePassword,
  responseObjGenerator,
};
