import express from 'express';
import mongoose from 'mongoose';
import {userRoute} from './routes/userAuth.js';
import { cafeRoute } from './routes/cafeterias.js';
import { orderRoute } from './routes/orderRoute.js';
import { locationRoute } from './routes/location.js';
import { menuRoute } from './routes/menuItem.js';

const app=express()

app.use(express.json())
app.use("/auth",userRoute);
app.use("/cafeterias",cafeRoute);
app.use("/orders",orderRoute);
app.use("/locations",locationRoute);
app.use("/menu",menuRoute);


app.listen(3001,()=>{
    console.log("Server started at port 3001...");
})


mongoose
.connect('mongodb+srv://21pw29:root@cafeteria.pc3jx81.mongodb.net/cafeteria?retryWrites=true&w=majority&appName=cafeteria')
.then(()=>{ console.log("Database connected!")})
.catch((err)=>console.log(err));