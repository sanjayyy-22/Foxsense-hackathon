import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true,
        },
        orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"order",
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
    }
)

export const notifyModel=mongoose.model("notification",notificationSchema);