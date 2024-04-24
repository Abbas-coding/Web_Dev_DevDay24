const mongoose = require('mongoose');

const connectDB =()=>{
    mongoose.connect(process.env.MONGODB_URL, {
    }).then((data)=>(
        console.log(`Connected to Database Successfully`)
    ))
}


module.exports = connectDB;