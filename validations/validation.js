const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
// exports.customerValidation = (req, res)=>{

exports.customerJoiSchema = Joi.object({
        firstName: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
                  
        lastName: Joi.string()
                  .min(5)
                  .max(30)
                  .optional(),

        email: Joi.string()
                .email()
                .min(5)
                .max(50)
                .required(),

        contact: Joi.string()
                 .pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'))
        //         //  .regex('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')   
                 .length(10)
                 .required(),
                 
        address: Joi.string()
                 .max(50)
                 .optional(),

        // password: Joi.number()
        //           .pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'))
        //           .required(),

        gender: Joi.string()
                  .required()            

    }
    )

//     return customerJoiSchema.validate(req.body)
// }
// exports.hotelValidation = (req, res)=>{

exports.hotelJoiSchema = Joi.object({
        hotelName: Joi.string().required()
                    .min(10)
                    .max(50),
        Description: Joi.string()
                     .min(5)
                     .max(50)
                     .optional(),
                     
        Category: Joi.string()
                    .required(),

        Rating: Joi.number()
                    .required(),

        Address: Joi.string()
                    .required(),
        
        Rooms: Joi.array()
                   .length(5)
                   .required()            
    })

//     return hotelJoiSchema.validate(req.body)
// }

// exports.bookingValidation = (req, res) =>{

exports.bookingJoiSchema = Joi.object({

        customerId: Joi.objectId().required()
                    .messages({
                        
                            }),

        hotelId: Joi.objectId().required(),

        checkIn: Joi.date(),

        checkOut: Joi.date()

    })
    // return bookingJoiSchema.validate(req.body)
// }
