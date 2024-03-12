import mongoose from "mongoose";

const orderSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        orderPlacedTime:{
            type:Date,
            default:Date.now,
            required:true,
        },
        items:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        }],
        orderType:{
            type:String,
            required:true,
        },
        totalAmt:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            requird:true,
        },
        pickupTime:{
            type:Date,
            default:Date.now,
        },
        cafteriaId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"cafe",
            required:true,
        },
    }
)

export const orderModel=mongoose.model("order",orderSchema);
