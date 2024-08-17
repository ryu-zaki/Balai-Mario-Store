//Models
const User = require('../schemas/User.js');
const {RefreshToken, OtpToken} = require('../schemas/Token.js');

const {checkRefreshToken} = require('./DatabaseInteractions.js');
const {generateAccessToken} = require('./Functionalites.js');

//Validations
const {userAccountAuth, emailAuth} = require('./Validations');

const jwt = require('jsonwebtoken');

const checkInputPattern = (req, res, next) => {
    const {email, password} = req.body;
    const validEmail = /.*@.*\.*/gi.test(email);
    const validPass = /.{6,}/.test(password);

    if (validEmail && validPass) {
        return next();
    }


    //Error Handling
    let errMess = "";
    let category = "";

    if (!validEmail) {
        errMess = "Invalid Email pattern";
        category = "email";
    } 
    
    else if (!validPass) {
        errMess = "Your password must be at least 6 characters long";
        category = "password";
    }
      
    return res.json({message: errMess, status: "BAD", category});
  
  }

const validateCookie = async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];
  
  if (!refreshToken) {
    
    return res.json({message: "Not Allowed"})
  };

  try {
    const isTokenExisted = await checkRefreshToken(refreshToken);
    
    if (!isTokenExisted) {
      res.json({isLogin: false}); 
      return;
    }
    
    req.isLogin = true;
    req.refreshToken = refreshToken;
    next();
  }

  catch(err) {
    console.log(err);
    res.sendStatus(500) //InternaL Server Error
  }

}

const getInfoFromToken = (req, res, next) => {
    const headers = req.headers["authorization"];
    const accessToken = headers && headers.split(" ")[1];


    if (!accessToken) return res.sendStatus(500);
       jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECURE, (err, data) => {

         if (err) {
          
          if (!(err.message === "jwt expired")) {
            return res.sendStatus(500) //internal server error
          }

          //generating new access 
          const refreshToken = req.cookies["refresh_token"];
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECURE, (err, data) => {

            if (err) return res.sendStatus(500);

            const userData = {email: data.email, password: data.password};
            const accessToken = generateAccessToken(userData);

            req.user = userData;
            req.accessToken = accessToken;
            next()
          });
         
         return;
        }; 

         req.user = data;
         next();
       });
}

const validateEmail = async (req, res, next) => {

   const {email} = req.body;

   try {
     const userData = await User.findOne({email});
     if (!userData) { 
      
      const newUser = await User.create({email});
      req.user = newUser;
      next();
      return;
    }
    
    req.user = userData;
    next();

   }

   catch(err) {
     console.log(err);
     return res.sendStatus(500);
   }

}

//User Cart
const addCartItem = async (req, res, next) => {

  const {email, password} = req.user;
  
  try {
      const userAcc = await userAccountAuth(email, password);

      if (!userAcc) {
        res.sendStatus(401)
        return;
      };

       await User.updateOne({email, password},  { $push: { cartProducts: {...req.body}} });

       const {cartProducts} = await User.findOne({email, password}).select('cartProducts').exec();

      req.newProduct = cartProducts[cartProducts.length - 1];
      
      console.log(cartProducts);
      next();
  }

  catch(err) {
      console.log(err.message);
      return res.sendStatus(500)
  }
}

const removeRefreshToken = async (req, res, next) => {

  const token = req.cookies["refresh_token"];

  try {
    await RefreshToken.deleteOne({token})
    next()
  }

  catch(err) {
    return res.sendStatus(500) //Internal Server Error
  }

}

const checkOtpToken = async (req, res, next) => {

  const otpToken = req.cookies["otp_token"];

  if (!otpToken) return res.sendStatus(403) //Forbidden

  try {

    const tokenVerified = jwt.verify(otpToken, process.env.OTP_TOKEN);
    if (!tokenVerified) return res.sendStatus(401) //Unauthorized

   // req.otpToken = otpToken;
    next();
  }

  catch(err) {
     console.log(err);
     return res.sendStatus(500) //Internal Server Error
  }
}


const extractFromEmail = async (req, res, next) => {

  try {
    const userAcc = await User.findOne({email: req.body.email});

    if (!userAcc) return res.sendStatus(403);
    
    if (!userAcc.password) return res.sendStatus(401);

     next();
  }

  catch(err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
}

module.exports = { 
  extractFromEmail,
  checkOtpToken,
  checkInputPattern, 
  validateCookie, 
  getInfoFromToken, 
  validateEmail,
  addCartItem,
  removeRefreshToken
} 