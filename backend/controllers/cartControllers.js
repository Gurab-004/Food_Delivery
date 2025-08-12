import userModel from "../models/UserModels.js"

//add items to user cart
const addToCart = async(req,res) =>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        //if the item does not exist in the cart data add one
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            // or else increment it 
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        return res.json({success:true,message:"added to cart"});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"});
    }

}

//remove items from user cart
const removeFromCart = async(req,res) =>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        //if the item does not exist in the cart data add one
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        return res.json({success:true,message:"removed from cart"});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"});
    }

}

//fetch user cart data
const getCart = async(req,res) =>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        return res.json({success:true,cartData});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"});
    }

}

export {addToCart,removeFromCart,getCart};