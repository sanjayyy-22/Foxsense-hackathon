import express from 'express';
import { orderModel } from '../models/order.js';

const route=express.Router();

route.post("/",async (req,res)=>{
    try{
        //const {userId,orderPlacedTime,items,orderType,totalAmt,status,pickupTime,cafteriaId}=req.body;
        const newOrder=new orderModel(req.body);
        const order=await newOrder.save();
        res.status(200).json({message:"Order placed successfully"});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.get("/:id", async(req,res)=>{
    try{
        const id=req.params.id;
        const order=orderModel.findById({id});
        if(!order){
            res.status(402).json({message:"No such order placed"});
        }
        res.status(200).json({message:order});

    }catch(err){
        res.status(501).json({message:err.message});
    }
})


route.get("/", async(req,res)=>{
    try{
        const order=orderModel.findById({});
        res.status(200).json({message:order});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.delete("/:id", async(req,res)=>{
    try{
        const {id}=req.params.id;
        const result=await orderModel.findByIdAndDelete(id);
        if(!result){
            res.status(404).json({message:"Not found"});
        }
        res.status(200).json({message:"Deleted successfully"});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.get("/users/:userId", async(req,res)=>{
    try{
        const {userId} = req.params.userId;
        const order=await orderModel.find({userId});
        res.status().json({message:order});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})




export {route as orderRoute};