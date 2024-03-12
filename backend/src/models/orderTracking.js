import mongoose from "mongoose";

const orderTrackSchema=new mongoose.Schema(
    {
        orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"order",
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
        locationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"location",
            required:true,
        },
        timeStamp:{
            type:Date,
            required:true,
            default:Date.now,
        },
    }
)

export const orderTrackModel=mongoose.model("track",orderTrackSchema);