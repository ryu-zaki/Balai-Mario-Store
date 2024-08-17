const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: String
})

const RefreshToken = mongoose.model("refresh_tokens", TokenSchema);
const OtpToken = mongoose.model("otp_tokens", TokenSchema);

module.exports = {RefreshToken, OtpToken};