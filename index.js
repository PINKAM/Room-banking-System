require("dotenv").config();
const express  = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

const customerRouter = require("./routes/customerRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const hotelRouter = require("./routes/routes");

const cors = require('cors');

console.log(process.env.MONGO_DB)
const db = mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("Successfull connection with mongodb ")
}).catch((err) => {
    console.error("Database Error", err)
})

app.use(express.json())
app.use(cors());
// app.use()
app.use(hotelRouter);
app.use(bookingRouter);
app.use(customerRouter);

app.listen(port,function(){
    console.log("App is listening to port"+port);
})