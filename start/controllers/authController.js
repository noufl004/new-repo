const User = require("../models/user");

const { StatusCodes } = require("http-status-codes");
const customeErrors = require("../errors");
const jwt = require("jsonwebtoken");
const {
  createJwt,
  attachCookiesToResponse,
  createTokenUser
} = require("../utils"); 

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  console.log("kkkkk", emailAlreadyExists);
  if (emailAlreadyExists) {
    throw new customeErrors.BadRequestError("email already existsss!!");
  }

  const user = await User.create(req.body);
  // when we move jwt code to utils folder change below code to new format
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  //   const token=jwt.sign(tokenUser,'jwtSecret',{expiresIn:'10d'})

  // comment below line once we create the cookie setup
  //const token=createJwt({payload:tokenUser})
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).send(tokenUser); //change it according with whne we added jwt token so new code below
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customeErrors.BadRequestError("please provide email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new customeErrors.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new customeErrors.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser=createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
