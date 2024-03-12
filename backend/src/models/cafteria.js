import mongoose from "mongoose";

const cafeSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        locationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"location",
            required:true
        },
        contactNo:{
            type:String,
            required:true
        },
        menu:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"menu",
            required:true,
            default:[],
        },
        imgurl:{
            type:String,
            required:false,
        },
    }
)

export const cafeModel=mongoose.model("cafe",cafeSchema);