import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("Connection error:", err);
  }
};


