require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 2000;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const {generateAccessToken} = require('./routes/Functionalites.js') ;
const {validateCookie} = require('./routes/middlewares.js');
const cookieParser = require("cookie-parser");

//Router
const users = require('./routes/User');
const cart = require('./routes/Cart.js');

mongoose.connect("mongodb://127.0.0.1:27017/balai_mario").then(() => {
  app.use(session({
    secret: 'a332f2c50708fba1e6a3ba22fd70aa20c9d92c22e20e00be0342dcd425b2f6d1f587709c0d5a87d31926f6af2a022509faa16c91097fece2d27b3d288fd9bf1b',
    resave: false,
    saveUninitialized: false,
}))

  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  app.use(express.static('./front-end/build'))
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
 
  
    app.use("/users", users);
    app.use('/cart', cart);
    app.post('/token', validateCookie, (req, res) => {
      const refreshToken = req.refreshToken;

         
       if (!refreshToken) return res.sendStatus(401);

       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECURE, (err, data) => {

        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        
        const {email, password} = data;

        const newToken = generateAccessToken({email, password});
        res.json({newToken});
       })
    })

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'))
    })

    app.listen(PORT, () => console.log(`Server is Running on PORT: ${PORT}`))
})
.catch(err => console.log(err));








