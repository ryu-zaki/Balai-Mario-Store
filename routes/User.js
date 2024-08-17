require('dotenv').config();

const express = require('express');

const router = express.Router();
const otpGenerator = require("otp-generator");
const {addAccount, storeRefreshToken, storeOtpToken} = require('./DatabaseInteractions');
const jwt = require("jsonwebtoken"); 
const {emailAuth, userAccountAuth} = require('../routes/Validations');
const {checkInputPattern, getInfoFromToken, validateCookie, validateEmail,  removeRefreshToken, checkOtpToken, extractFromEmail} = require('./middlewares');
const cors = require('cors');
const {generateAccessToken, transporter} = require('./Functionalites');
const cookieParser = require("cookie-parser");
const User = require('../schemas/User');
const { OtpToken } = require('../schemas/Token');


router.use(cookieParser());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

router.get('/', (req, res) => {
    res.json({});
})

router.post('/create', checkInputPattern, (req, res) => {
    const {email, password} = req.body;

    emailAuth(email)
    .then(isExisting => {
        
        if (!isExisting) {
            addAccount(email, password)
            .then(() => {
                res.json({message: "user created", status: "OK"});
            })
            .catch(err => console.log(err));
            return;
        } 

        res.json({message: "email already registered", status: "BAD", category: "email"}) //Bad Request

    })
    
})

router.post('/login', removeRefreshToken, (req, res) => {
    const {email, password} = req.body;
        
        userAccountAuth(email, password)
        .then(userAcc => {

           if (!!userAcc) {
            const {email, password} = userAcc;
            const userData = {email, password};

            //access tokens
            const accessToken = generateAccessToken(userData);

            //refresh tokens
            const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECURE);
            
            storeRefreshToken(refreshToken)
            .then(() => {
                res.cookie('refresh_token', refreshToken, {
                    secure: false,
                    sameSite: 'lax',
                });
            
                res.json(
                    {
                        message: "Account Login", 
                        status: "OK", 
                        accessToken,
                        userData: userAcc
                    });
            })
             return;
           }

           res.json({message: "Incorrect email or password", status: "BAD"});

        })
})

router.post('/logout', getInfoFromToken, removeRefreshToken, (req, res) => {
   
    const {email} = req.user;

    emailAuth(email)
    .then(isExisting => {
     if (isExisting) {
        res.clearCookie("refresh_token", {
            secure: false,
            sameSite: 'lax',
            domain: 'localhost'});
        
        res.sendStatus(200)
        return;
     }

     res.sendStatus(403)
      
    })
    .catch(err => console.log(err))
    
})

//getInfoFromToken = getting the user info

router.post('/check-info', validateCookie, getInfoFromToken, async (req, res) => {
    const {email} = req.user;
   
    try {
        const user = await User.findOne({email});

        if (!user) return res.sendStatus(401);

        const allUsers = await User.find({}, {email: 1});
       
        
        return res.json(
            {
                allUsers: allUsers.filter(data => data.email !== email),
                accessToken: req.accessToken, 
                userData: user,
                isLogin: req.isLogin
            }
        )
        
    }

    catch(err) {
        console.log(err)
        res.sendStatus(500) //Internal Server Error
    }
})

//When the user chose the google option to login

router.post('/google-login', validateEmail, removeRefreshToken, (req, res) => {

    const {email, password} = req.user;
    const userData = {email, password};

    const accessToken = generateAccessToken(userData);
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECURE);

    storeRefreshToken(refreshToken).then(() => {

        res.cookie("refresh_token", refreshToken, {
           
            secure: false,
            sameSite: 'lax',
            domain: 'localhost'
        });
        
        res.json({accessToken, userData: req.user})
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

    
})


router.post('/send-otp', extractFromEmail, async (req, res) => {
    
    const otp = otpGenerator.generate(5, {upperCaseAlphabets: false, specialChars: false});

    try {

        const jwtOtp = jwt.sign(otp, process.env.OTP_TOKEN);

        const mail = await transporter.sendMail({
            from: process.env.GMAIL_USER, // sender address
            to: req.body.email, // list of receivers
            subject: "One Time Password", // Subject line
            text: `Your OTP is ${otp}`
          });
        
        console.log(mail);

        res.cookie("otp_token", jwtOtp, {
            secure: false,
            sameSite: 'lax',
            domain: 'localhost' 
        });



        setTimeout(() => {
            res.sendStatus(200);
        }, 3000)
        
    }

    catch(err) {
       res.sendStatus(500) //INternal Server Error
       console.log(err.message);
    }
})

router.post('/verify-otp', async (req, res) => {

    const {enteredOtp} = req.body;
    const otpToken = req.cookies["otp_token"];

    try {
        const data = jwt.verify(otpToken, process.env.OTP_TOKEN);
         
        if (data !== enteredOtp) throw new Error("not match");

    
        setTimeout(() => {
            res.sendStatus(200);
        }, 3000)
        
    }

    catch(err) {
        setTimeout(() => {

            res.sendStatus(500);
        }, 3000);


        console.log(err.message);

    }

})

router.post('/reset-pass', checkOtpToken, async (req, res) => {

    const {email, newPass} = req.body;
    const validPass = /.{6,}/.test(newPass); 
    
    if (!validPass) return res.sendStatus(403);

    try {

        await User.updateOne({email}, {$set: { password: newPass}});
        
        setTimeout(() => {
            res.sendStatus(200);
        }, 3000)
       
    }

    catch(err) {
        console.log(err);
        res.sendStatus(500) //Internal Server Error
    }

})


router.post('/remove-otp', async (req, res) => {
    try {
        const otpToken = req.cookies["otp_token"];

        if (!!otpToken) {
            await OtpToken.deleteOne({token: otpToken})
        } 
        
        return res,sendStatus(200);
    }
   
    catch(err) {
    console.log(err.message);
    res.sendStatus(500);
    }
});



router.use(validateCookie);
router.use(getInfoFromToken);

router.post('/save-info', async (req, res) => {

    try {
    console.log(req.body);
    const {personalInfo, shippingInfo} = req.body;
    const {email, password} = req.user;

     await User.updateOne({email, password}, { $set: { saveInfo: {personalInfo, shippingInfo}}});


     res.sendStatus(200);
    }  

    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

});

router.post('/update-info', async (req, res) => {
    
    try {
        const {email, password} = req.user;

        await User.updateOne({email, password}, {$set: {saveInfo: req.body}})
        console.log("Info Updated");
        res.sendStatus(200);
    }

    catch(err) {
     console.log(err);
     return res.sendStatus(500);
    }
    
})



module.exports = router;
