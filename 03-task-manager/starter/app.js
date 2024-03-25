 const connectDB = require ('./db/connent');
const express = require('express');
require('dotenv').config();
const app = express();
const tasks =  require('./routes/tasks')
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks',tasks);
const start = async ()=>{
    try {
         await connectDB(process.env.MONGO_URL);
        app.listen(4000,()=>{
            console.log("started")
        })
    
    } catch (error) {
        console.log(error);
    }
}
start();