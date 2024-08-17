const mongoose = require("mongoose");
const User = require('../schemas/User');
const {RefreshToken, OtpToken} = require('../schemas/Token')

const dbConnect = async (_, res, next) => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/balai_mario");
        console.log("Database connected")
        next();
    }

    catch({message}) {
      res.send({message});
    }

    finally {
        await mongoose.connection.close();
        console.log("Database closed")
    }

}

const getAllUsers = async () => {

    try {
     
    }

    catch(err) {

    }
}

const addAccount = async (email,  password) => {

   try {
    const newUser = await User.create({email, password});

    return newUser;
   }

   catch({message}) {
    throw new Error(message);
   }

}

//Tokens
const storeRefreshToken = async (refreshToken) => {
    try {
       
       const existingToken = await RefreshToken.findOne({token: refreshToken});
       if (!!existingToken) return refreshToken;

       const token = await RefreshToken.create({
           token: refreshToken
       })
   
       return token;
    }
   
    catch(err) {
       console.log(err)
       return err;
    }
   }

const checkRefreshToken = async (refreshToken) => {

    try {
       const token = RefreshToken.find({token: refreshToken});

       return !!token;
    }

    catch(err) {
        console.log(err);
        return err;
    }
}

const storeOtpToken = async (otpToken) => {

    try {
        const newToken = await OtpToken.create({token: otpToken});
        console.log("Token Stored");
        return newToken;
    }
  

    catch(err) {
        console.log(err);
        return err;
    }
  };


module.exports = {dbConnect, addAccount, storeRefreshToken, checkRefreshToken, storeOtpToken};