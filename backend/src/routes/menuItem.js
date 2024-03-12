import { menuModel } from '../models/menuItem.js';
import express from 'express';
const route=express.Router();

route.post("/",async(req,res)=>{
    try{
        const newItem=new menuModel(req.body);
        newItem.save();
        res.status(200).json({message:newItem});

    }catch(err){
        res.status(501).json({message:err.message});
    }
})


route.get("/",async(req,res)=>{
    try{
        const menu=await menuModel.find({})
        res.status(200).json({message:menu});
    }
    catch(err){
        res.status(501).json({message:err.message}) ;
    }
})



export {route as menuRoute};