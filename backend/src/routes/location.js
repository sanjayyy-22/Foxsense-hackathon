import { locationModel } from "../models/location.js";
import express from 'express';

const route=express.Router();

route.get("/", async(req,res)=>{
    try{
        const locations=await locationModel.find({});
        res.status(200).json({message:locations});

    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.post("/",async(req,res)=>{
    try{
        const newLocation=new locationModel(req.body);
        await newLocation.save();
        res.status(200).json({message:newLocation});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

export {route as locationRoute};