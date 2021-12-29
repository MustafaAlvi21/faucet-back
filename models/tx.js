const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TXSchema = new mongoose.Schema({
    type:             { type: Number, required: true  }, 
    blockNumber:      { type: Number, required: true  }, 
    from:             { type: String                  },
    to:               { type: String, required: false },
    gasPrice:         { type: String, required: false },
    r:                { type: String, required: false },
    s:                { type: String, required: false },
    v:                { type: String, required: false },
    input:            { type: String, required: false },
    transactionIndex: { type: Number, required: false },
    blockHash:        { type: String, required: false },
    gas:              { type: String, required: false },
    hash:             { type: Number, required: false, unique: [true, "TX Hash already saved."] },
    nonce:            { type: Number, required: false },
    value:            { type: String                  },

    // status :          { type: String, default:"NotYet", enum:["NotYet", "InProgress", "complete"] }
})

TXSchema.plugin(uniqueValidator)
module.exports = mongoose.model('transactions', TXSchema)