const Booking = require("../model/booking");

// booking
exports.getAllBooking = async (req, res)=>{
    try{
        const bookings = await Booking.find().catch((error)=>{
            throw "Error while fetchin booking from database"
        })

        if(!bookings){
            return res.status(404).json({
                message:"booking not found"
            })
        }

        return res.status(200).json({
            message:"Query for fetching booking executed successfully"
        }, bookings)
    }
    catch(error){
        return res.status(500).json({
            message:"Error while fetching all booking details"
        })
    }
}
exports.newBooking = async (req, res)=>{
    try{
        
        const booking = req.body;
        const {customerId, checkIn,checkOut } = booking;
        // {
        //     "customerId":"64781abcb3d4cb413eb97361",
        //     "hotelId":"64799ad822c80641be38f914",
        //     "checkIn":"02/06/2023",
        //     "checkOut":"05/06/2023"
        // }
        
        console.log(req.body)
        await Booking.create(booking).catch((error)=>{
            throw "Error whille saving booking in database"
        });
    }
    catch(error){
        return res.status(500).json({
            message:"Error while creating booking"
    })
}
}
exports.updateBooking = async (req, res)=>{
    try{
        const booking = await Booking.findById(req.id).catch((error)=>{
            return error
        })

      if(!booking){
            return res.status(404).json({
                message:"Booking not exist."
            })
      }

       booking.checkIn = req.body.checkIn;
       booking.checkOut = req.body.checkOut;

       await Booking.findByIdAndUpdate(booking._id, {checkIn:booking.checkIn}, {checkOut:booking.checkOut}).catch((error)=>{
            throw error
       })
    }
    catch(error){
        return res.status(500).json({
            message:"Error while Updating booking"
    })
    }   
}
exports.deleteBooking = async (req, res)=>{
    try{
        const bookingId = req.params;
        
        const booking = await Booking.findById(bookingId).catch((error)=>{
            throw error
        })

        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }
        await Booking.findByIdAndDelete(bookingId).catch((error)=>{
            throw error
        })
        return res.status(200).json({message:"Booking deleted successfully"})
    }
    catch(error){
        return res.status(500).json({
            message:"Error while deleting booking"
        })
    }
}