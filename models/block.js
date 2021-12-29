const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const BlockSchema = new mongoose.Schema({
    gasLimit:          { type: Number, required: true  }, 
    gasUsed:           { type: Number, required: true  }, 
    logsBloom:         { type: Array                   },
    receiptsRoot:      { type: String, required: false },
    sha3Uncles:        { type: String, required: false },
    parentHash:        { type: String, required: false },
    difficulty:        { type: String, required: false },
    extraData:         { type: String, required: false },
    miner:             { type: String, required: false },
    mixHash:           { type: String, required: false },
    number:            { type: Number, required: false, unique: [true, "Block Number already saved."] },
    timestamp:         { type: Number, required: false },
    transactionsRoot:  { type: String, required: false },
    uncles:            { type: Array                   },
    hash:              { type: String, required: false },
    nonce:             { type: String, required: false },
    size:              { type: Number, required: false },
    stateRoot:         { type: String, required: false },
    totalDifficulty:   { type: String, required: false },
    totalTransactions: { type: Number, required: true  },

    status :           { type: String, default:"NotYet", enum:["NotYet", "InProgress", "complete"] }
})

BlockSchema.plugin(uniqueValidator)
module.exports = mongoose.model('blocks', BlockSchema)