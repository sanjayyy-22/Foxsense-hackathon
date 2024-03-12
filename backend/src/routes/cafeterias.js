import express from 'express';
import { cafeModel } from '../models/cafteria.js';
import { menuModel } from '../models/menuItem.js';

const route=express.Router();

route.get("/", async(req,res)=>{
    try{
        const cafe=await cafeModel.findOne({});
        res.status(200).json({message:cafe});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.post("/", async(req,res)=>{
    try{
        const {name,locationId,contactNo,imgUrl} = req.body;
        const newCafe=new cafeModel(req.body);
        await newCafe.save();
        console.log(newCafe);
        
        res.status(200).json({message:"New Cafe launched"});

    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.get("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const cafe= await cafeModel.findById({id});
        if(!cafe){
            res.status(402).json({message:"No such cafe exists"});
        }
        res.status(200).json({message:cafe});
    }catch(err){
        res.status(501).json({message:err.message});
    }
})

route.get("/:id/menu", async(req,res)=>{
    try{
        const id=req.params.id;
        const cafe=cafeModel.findById({id});
        if(!cafe){
            res.status(402).json({message:"No such cafe exists"});
        }
        res.status(200).json({message:cafe.menu});
    }catch(err){
        res.status(501).json({message:err.message});
    }
    
})


route.post("/items/:cafeteriaId", async (req, res) => {
    try {
        const { name } = req.body;
        const cafeteriaId = req.params.cafeteriaId;

        // Find the menuItem by name
        const menuItem = await menuModel.findOne({ name });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Find the cafeteria by ID
        const cafeteria = await cafeModel.findById(cafeteriaId);

        if (!cafeteria) {
            return res.status(404).json({ message: "Cafeteria not found" });
        }

        // Add the menuItem ID to the cafeteria's items array
        cafeteria.menu.push(menuItem._id);
        await cafeteria.save();

        res.status(201).json({ message: "Item added to cafeteria", item: menuItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export {route as  cafeRoute};

