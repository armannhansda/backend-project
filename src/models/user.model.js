import mongoose, { SchemaTypeOptions } from "mongoose";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import { Schema } from "mongoose";


const userSchema = new Schema(
  {
    
    username:{
      type: String,
      required: true,
      lowercase: true,
      unique : true,
      trim: true,
      // always keep index: true if you want somthing to be searched
      index: true
    },

    email:{
      type: String,
      required: true,
      lowercase:true,
      unique: true,
      trim: true, //used to remove white spaces
    },

    fullName:{
      type: String,
      required: true,
      
    },
    avatar:{
      type: String, // cloudinary url
      reuired: true,

    },
    coverImage:{
      type: String, //cloudinary url
      reuired: true

    },


    password:{
      type: String,
      required: true,
    },
    refreshToken:{
      type: String,
      required: true
    },

    watchHistory:[
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }

    ]
    


    
  },
  {timestamps: true}
)

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password /*what you want to encrypt*/, 10 /* how many rounds*/)
  next()
})

//check whether enter the correct passward or not by creating method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function() {
  return Jwt.sign(
    {
      //payloads
      _id: this._id,
      email: this.email,
      usrname: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET , // replace with your actual secret
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // optional: set token expiration
  );
}

userSchema.methods.generateRefreshToken = function(){
  return Jwt.sign(
    {
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      ExpiryIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User = mongoose.model("User", userSchema)