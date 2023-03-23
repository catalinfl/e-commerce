import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from "express";
import authRoute from './routes/auth'
import productRoute from './routes/product';
import express from "express"
import cors from "cors";
import orderRoute from './routes/order';
import userRoute from './routes/user';
import { getProductQuery } from './controllers/product';


dotenv.config();

const app = express();
app.use(express.json());
// env processes


const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT;

if (typeof(MONGOURL) !== "string") {
    throw Error;
}




// connect

mongoose.connect(MONGOURL)
.then(() => console.log("DB started"))
.catch(err => console.log(err));

app.use(cors());
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log("It's working on port " + PORT);
})

