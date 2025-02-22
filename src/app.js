import express from 'express'
import cors from 'cors';
const app = express();
import cookieParser from cookieParser

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: '16kb'}))// taking data as a json from form

//taking data from url
app.use(express.urlencoded({extended: true, limit: '16kb'})) //extended is use for taking object inside object (nested object)

app.use(express.static("public"))// sometimmes we wnt to store file images data inthe server so that it can accessable
app.use(cookieParser())
// to accept file to express is not ready so we use multer(therd party package)

export { app }