import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

// to use dotenv you will have to add inside json file "dev": "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
dotenv.config({  
  path: './env'
})



connectDB() // mongodb  connected
.then(()=>{
  app.on("error",(error)=>{
    console.log("ERROR",error)
    throw error
  })
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server running at: http://localhost:${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("MONGODB connection failed!!!", err)
})


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