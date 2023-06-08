const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
 
    adminName:{
        type:String
    },
    adminPassword:{
        type:String
    },
    adminEmail:{
        type:String
    },
    hotelId:{
        type:null
    },
    bookingId:{
        type:null
    },
    userId:{
        type:null
    }
})
const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;