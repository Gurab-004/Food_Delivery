import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js"
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config' //env file is included in prject
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
  
//app config
const app = express();
const port = 4000;

//middleware connecting frontend to backend
app.use(express.json());
app.use(cors()) //this one connects backend to front end

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter) //for food add,delete,list
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter) //for login and registration
app.use("/api/cart",cartRouter)// for displaying adding and removing items from user cart in front end
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("API WORKING")

});

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
});


//mongodb+srv://aishwaryakparida:654123@cluster0.tb0lgyd.mongodb.net/?