const responseObjGenerator = (success, message, data) => {
  let resObj = {};
  resObj.success = success;
  resObj.message = message || (success ? "Successful!" : "Failed!");
  if (data) {
    resObj.data = data;
  }
  return resObj;
};

module.exports = {
  responseObjGenerator,
};
