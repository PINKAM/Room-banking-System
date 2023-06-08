const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    Description:{
        type:String,
        
    },
    Type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    BedOptions:{
        type:String,
        required:true
    },

}) 
const HotelSchema = new mongoose.Schema({
    
    hotelName:{
        type:String,
        required:true
    },
    Description:{
        type:String,
     
    },
    Rating:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
    },
    Address:{
        type:String,
        required:true
    },
    Rooms:{
        // type:[mongoose.Schema.Types.RoomSchema]
        type:[RoomSchema],
        required:true
    }

})
const Hotel = mongoose.model("Hotel",HotelSchema);

module.exports = Hotel;