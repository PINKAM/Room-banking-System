const fs = require("fs");
const Hotel = require("../model/hotel");

// hotels
exports.getHotels =(req, res)=>{
    try{
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading JSON file:', err);
              res.sendStatus(500);
            } else {
              
              const jsonData = JSON.parse(data);
              res.json(jsonData);
            }
          });
    }
    catch(error){
        return res.statusCode(500).json({
            message:"Error sending hotel data"
        })
    }
   
}
exports.getAllHotels = async (req, res)=>{
    try{
        const hotelData = await Hotel.find().catch((error)=>{
            throw error
        })

        if(!hotelData){
            return res.status(404).json({message:"Hotels not found"})
        }

        return res.status(200).json({
            message:"Hotel fetched successfully"
        }, hotelData)
         
    }
    catch(error){
        return res.statu(500).json({
            message:"Error while fetching all hotels data"
        })
    }
}
exports.deleteHotel = async (req, res)=>{
    try{
        const hotel = await Hotel.findById(req.id).catch(()=>{
            throw "Error while fetching the hotel to be deleted from database"
        })

        if(!hotel){
            return res.status(404).json({
                message:"hotel not found"
            })
        }
        await Hotel.deleteOne(hotel._id).catch((error)=>{
            throw "Error while deleting hotel from database"
        })
        return res.status(200).json({
            message:"Hotel deleted from database successfully"
        })
    }
    catch(erorr){
        return res.statu(500).json({
            message:"Error while deleting hotel data"
        })
    }
}
exports.updateHotel = async (req, res)=>{
    try{
        const hotel = await Hotel.findById(req.id).catch((error)=>{
            throw "Error while fetching hotel that is to be updated"
        })
        if(!hotel){
            return res.status(404).json({
                message:"Error: Hotel not found"
            })
        }

        await Hotel.findByIdAndUpdate(hotel.id,{hotelName:req.hotelName}, {Rating:req.Rating}).catch((error)=>{
            throw "Error while saving updating hotel details"
        })  
        return res.status(200).json({
            message:"Hotel data updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Error while upating hotel"
        })
    }
}
exports.createHotels = async (req, res)=>{
    try{
        const newhotel = req.body;
        console.log("hotels", req.body)

        // const hotel = await Hotel.findOne()
        await Hotel.create(newhotel).catch((error)=>{
            throw error
        })
        return res.status(200).json({
            message:"Hotel Created successfully"
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Error white creating user"
    })
}
}
