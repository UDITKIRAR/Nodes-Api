require('dotenv').config();
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
app.use(express.json());
const router = require('./routes/products');
app.use('/api/v1/products',router);
app.use(errorMiddleware);
app.use(notFoundMiddleware);
const port =  4000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log("server is listing");
        })
    } catch (error) {
        console.log(error);
    }
}
start();