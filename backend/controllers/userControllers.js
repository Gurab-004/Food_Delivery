import userModel from "../models/UserModels.js";
import jwt from "jsonwebtoken" // for authentication 
import bcrypt from "bcrypt"  //for hashing password
import validator from "validator" //used for checking if email is in a valid form


//login user
const loginUser = async(req,res) =>{
    const {name,password,email} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"password is incorrect"})
        }
        //if password matches create token
        const token = createToken(user._id);
        return res.json({success:true,token});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});

    }

}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET) //jwt_secret is from .env file
}

//register user
const registerUser = async(req,res) =>{
    const {name,password,email} = req.body;
    try{
        //checking if user already exist
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"});
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});


    }

}

export {loginUser,registerUser};