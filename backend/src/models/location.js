import mongoose from "mongoose";

const locationSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true
        },
        campus:{
            type:String,
            required:true,
        },
    }
)

export const locationModel=mongoose.model("location",locationSchema);