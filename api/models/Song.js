const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    date:{
        type:String,
    },

    playlistId:{   
        type:String //PLAYLIST id: use with embedding code to display
    },

    songId:{
        type:String //SONG id: use with embedding code to display
    },

},

{timestamps:true});

module.exports = mongoose.model("Song", SongSchema); 


