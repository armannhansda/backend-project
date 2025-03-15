import { constants } from "fs/promises";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { UploadCloudinary } from "../utils/cloudinary.js";
import { upload } from "../midlewares/multer.midleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async(req,res)=>{
  // steps-----
  //get user datails from frontend
  //validation -- not empty
  // check user already exists or not
  //check for images, check for avatar
  // upload them in cloudinary, avatar
  // create user object- create entry in db
  // remove passward and refress token field from response
  //check for user creation
  // return response

  const { fullname, email, username, password} = res.body
  console.log("email", email);

  // validation- not empty
  if(
    [fullname, email, username, password].some((field)=>
    field?.trim()=="")){
      throw new ApiError(400, "All fields are required");
  }

   // check user already exists or not
  const existedUser = User.findOne({
    $or:[{username}, {email}]
  })
  if(existedUser){
    throw new ApiError(409, "user with email already exist")
  }

  //check for images, check for avatar
  const avatarlocalPath = res.files?.avatar[0]?.path;
  const coverImageLocalPath = res.files?.coverImage[0]?.path;

  if(!avatarlocalPath){
    throw new ApiError(400, "avvatar file is required");
    
  }
  // upload them in cloudinary, avatar
  const avatar = await UploadCloudinary(avatarlocalPath)
  const coverImage = await UploadCloudinary(coverImageLocalPath)
  if(!avatar){
    throw new ApiError(400, "avatar required")
  }

  // create entry on db
  const user = User.create({
    fullname,
    avatar:avatar.url,
    coverImage: coverImage?.url,
    email,
    password,
    username: username.tolowecase()
  })

  const createdUser = User.findById(User._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "something went wrong while rgistering user")
  }

  //return response

  return res.statu(201).json(
    new ApiResponse(200, createdUser, "User successfully registered")
  )


})

export{registerUser}