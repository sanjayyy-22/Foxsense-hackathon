import { notifyModel } from "../models/notification.js";
import { userModel } from "../models/userModel.js";
import { orderModel } from "../models/order.js";
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const route=express.Router();

route.get("/:userId", async(req,res)=>{
    try{
        const {userId} = req.params.userId;
        const notifications=await notifyModel.find({userId});
        res.status(200).json({message:notifications});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '11207sanjayshrinivas@gmail.com',
      pass: process.env.PASSWORD
    }
  });

route.post('/send', async (req, res) => {
  try {
    const { userId, orderId, message } = req.body;

    const user = await userModel.findById(userId);
    const order = await orderModel.findById(orderId);

    const otp = generateOTP();
    sendtoEmail();
        
        // Update the order status
    order.status = 'Completed';
    await order.save();

    const notification = new notifyModel({ userId, orderId, message });
    await notification.save();

    res.status(201).json(notification);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});
  

module.exports = router;


function generateOTP() {
    return randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
  }
  
  
  function sendtoEmail(email, otp) {
    const mailOptions = {
      from: '11207sanjayshrinivas@gmail.com',
      to: email,
      subject: 'One Time Password (OTP) for OrderPickup',
      text: `Your OTP is ${otp}.Please enter this code to pickup your order. Enjoy your meal!`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred while sending email: ', error);
      } else {
        console.log('Sent to email successfully: ', info.response);
      }
    });
  }
  
  
