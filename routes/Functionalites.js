require('dotenv').config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateAccessToken = (data) => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECURE, {expiresIn: "2m"});
    return token;
}

const transporter = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false
    },
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

module.exports = {generateAccessToken, transporter};