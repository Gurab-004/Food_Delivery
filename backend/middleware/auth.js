import jwt from "jsonwebtoken"

//it uses user token to authenticate and helps in cartCOntroller functionality

const authMiddleWare = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"not authorized login again"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET) //retuens userid
        req.body.userId = token_decode.id;
        next();

    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})


    }

}

export default authMiddleWare;