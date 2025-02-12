import dotenv from 'dotenv'
import mongoose from "mongoose";

import connectDB from "./db/index.js";

dotenv.config({
  path: './env'
})



connectDB();



/* //naive approach
import express from "express";
const app = express();
(async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error",(error)=>{
      console.log("ERROR",error)
      throw error
    })
    app.listen(process.env.PORT, ()=>{
      console.log(`the server is runnig on: http://localhost:${process.env.PORT}`);
    })
  }catch(error){
    console.error("ERROR" , error)
    throw error
  }
})()*/