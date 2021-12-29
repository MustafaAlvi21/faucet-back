const mongoose = require('mongoose');

const FaucetSchema = new mongoose.Schema({
    wallet: { type: String, required: true, min: [42, 'invalid wallet address'], max: [42, 'invalid wallet address'] }, 
    dateTime: { type: String, default : Date.now(), required: true }, 
    ip: { type: String, required: false }
})

module.exports = mongoose.model('faucets', FaucetSchema)