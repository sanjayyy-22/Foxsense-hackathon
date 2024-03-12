import mongoose from "mongoose";

const menuSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        cuisine:{
            type:String,
            required:true,
        },
        available:{
            type:Boolean,
            required:true,
        },
        imgurl:{
            type:String,
            required:true,
        },
        cafteriaId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"cafe",
            required:true,
        },
        lastupdated:{
            type:Date,
            required:true,
            default:Date.now,
        },
        dietaryInfo:{
            type:String,
            required:true,
        },
    }
)

export const menuModel=mongoose.model("menu",menuSchema);