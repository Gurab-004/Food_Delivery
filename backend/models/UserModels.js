import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
},{minimize:false}); //minimize:false is added so that the cart object can be initialized as empty object

const userModel = mongoose.models.user || mongoose.model("user",userSchema); 

export default userModel;