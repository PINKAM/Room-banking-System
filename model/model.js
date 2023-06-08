const mongoose = require('mongoose');
const {GenderEnum, RoleId} = require("../commons/enums/common.enums");

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
      },
    lastName: {
        type: String,
      },
    email:{
      type:String,
      required:true
    },
    contact:{
      type:Number,
      required:true
    },
    address:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    gender: {
      type: String,
      enum: GenderEnum,
      required:true
    },
    roleId:{
      type: String,
      enum:RoleId,
      required:true
    
    },

        
})

const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;