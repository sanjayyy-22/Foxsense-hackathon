import express from 'express';
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const route=express.Router();


route.get("/register", async(req,res)=>{
    try{
        const {username,password,email,department}=req.body;
        const user=await userModel.findOne({username});
        if(user){
            res.status(401).json({message:"Username not available"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new userModel({username,password:hashedPassword,email,department});
        await newUser.save();
        res.status(201).json({message:"Registered successfully"});
    }catch(err){
        console.log(err);
        res.status(501).json({message:err.message});
    }
})

route.post("/login", async(req,res)=>{
    try{
        const {username,password}=req.body;
        const checkUser=await userModel.findOne({username});
        if(!checkUser){
            res.status(403).json({message:"User not registered!"});
        }
        const isPassValid=await bcrypt.compare(password,checkUser.password);
        if(!isPassValid){
            res.status(403).json({message:"Username or password is invalid"});
        }
        const token=jwt.sign({id:checkUser._id},process.env.SECRET_KEY);
        res.status(200).json({userID:checkUser._id,token:token});
    }catch(err){
        res.status(503).json({message:err.message});
    }
})

export {route as userRoute};