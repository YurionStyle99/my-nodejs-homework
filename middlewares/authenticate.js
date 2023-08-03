const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next({ status: 401, message: "Not authorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      return next({ status: 401, message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return next({ status: 401, message: "Not authorized" });
  }
};

module.exports = authenticate;
