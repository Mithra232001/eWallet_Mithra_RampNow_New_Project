const mongoose = require("mongoose");

//transaction model
const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required : true
    },
    description:{
        type:String,
        required : true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required : true
    }
}, {timestamps:true})

module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');