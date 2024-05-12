const CustomError = require("../errors");
const { isTokenVerified } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    console.log("llllllllllllllllll", "no token");
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  console.log("llllllllllllllllll", token);

  try {
    const { name, userId, role } = isTokenVerified({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalidsss");
  }
};

const authorizePermissions = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "you are not authorized to acces this page"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
