import foodModel from "../models/foodModels.js";
import fs from "fs" //file system


//add food item

const addFood = async(req,res) =>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"food added"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}


//list food
const listFood = async(req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    }catch{
        console.log(error);
        res.json({success:false,message:"Error"});

    }
}

//remove food

const removeFood = async(req,res) =>{
    
    try{
        const food = await foodModel.findById(req.body.id);
        //deleting all images stored in uploads folder corresponding to the id
        fs.unlink(`uploads/${food.image}`,() =>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food Removed"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}


export {addFood,listFood,removeFood}