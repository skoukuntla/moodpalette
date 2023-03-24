const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    color:{
        type:String,
    },

    vibes:{
        type:Number,
    },

    journal:{
        type:String,
    },

    completedHabits: {
        type: Array,
        default: [],
    },

},

{timestamps:true});

module.exports = mongoose.model("Day", DaySchema); 


