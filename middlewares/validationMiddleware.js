
exports.validate = (schema) => (req, res, next) => {
    try{
        const {error} = schema.validate(req.body, {errors:{label:'key'}, abortEarly:false});
        const arrayofError = []; 
        if (error) {
            console.log(error);
            const errorValidation = error.details.map((error)=>{
              arrayofError.push({Key:error.context.key, message:formatError(error)});  

            })
            console.log(arrkey)
            const key = error.details.map((error)=>{
              return keyError(error);
            })
    
          res.status(400).json({
            status:400,
            message:"Please enter valid input data",
            error:arrkey
          })
            // .send(error.details[0].message);
        } else {
          next();
        }
    }
    catch(error){

    }
}
const keyError =(error)=>{
  const {key} = error.context;
  return key;

}
const formatError = (error)=>{
    JSON.stringify(error).replace(/\\/g, '');
    const {message, context} = error;
    message.replace('""', '');
    return message;
}
// [{
//   key: 'hotelId',
//   message: "hotelId is required."
// }]

// {
//   status = 400,
//   message: "Please provide valid inputs",
//   error: [{}]
// }