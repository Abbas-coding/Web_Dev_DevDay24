const app = require('./app');
const connectDB = require('./db/db');


// handling uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server for handling uncaught exception');
    server.close(()=>{
        process.exit(1);
    })
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:'./config/.env'
    })
}

//connect to db
connectDB();

// create server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// undhandled promise rejections
process.on('unhandledRejection', (err)=>{
    console.log(`Shutting down the server for ${err.message}`)
    console.log('Shutting down the server for unhandled promise rejection')
    server.close(()=>{
        process.exit(1);
    })
})
