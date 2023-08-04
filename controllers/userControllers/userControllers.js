const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateUserStatus = require("./updateUserStatus");
const updateUserAvatar = require("./updateUserAvatar");
const verifyUserEmail = require("./verifyUserEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserStatus,
  updateUserAvatar,
  verifyUserEmail,
  resendVerifyEmail
};
