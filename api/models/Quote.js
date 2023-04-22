const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
    quote_id: {
        type:String,
        required:true
    },
    quote_text: {
        type:String,
        required:true
    },
    quote_author: {
        type:String,
        required:true        
    }
},

{timestamps:true});

module.exports = mongoose.model("Quote", QuoteSchema);