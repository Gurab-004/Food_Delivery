import orderModel from "../models/orderModels.js";
import userModel from "../models/UserModels.js";
import stripe from "stripe"



//placing user order from frontend
const placeOrder = async(req,res) =>{
    const frontend_url = "http://localhost:5173"
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        //cleaning the user cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


        //use any payment interface here

        const url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`
        return res.json({success:true,session_url:url})
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}


const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            return res.json({success:true,message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            return res.json({success:false,message:"Not paid"}) 
        }

    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

//user orders for frontend
const userOrders = async(req,res) =>{
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        return res.json({success:true,data:orders});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

//listing user orders for admin  orders section
const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({});
        return res.json({success:true,data:orders});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

//api for updatinf order status for user in admin pannel
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { status: req.body.status }
    );
    return res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};