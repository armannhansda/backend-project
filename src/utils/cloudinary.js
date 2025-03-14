import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'
import { unlink } from 'node:fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const UploadImage = async(localFilePath) =>{
  try{
    if(!localFilePath) return null;

    //uploading file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    //file has been uploaded
    console.log("File has been uploaded on cloudinary: " ,response.url);
    return response;
  } catch(error) {
    fs.unlink(localFilePath);
    return null;
  }
}