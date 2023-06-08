const mongoose = require("mongoose");
const Customer = require('./model')
const BookingSchema = new mongoose.Schema({
    
    customerId:{
        type:mongoose.Schema.Types.ObjectId
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId
    },
    checkIn:{
        type:Date
    },
    checkOut:{
        type:Date
    },

})
const Booking = mongoose.model("Booking",BookingSchema);

module.exports = Booking;