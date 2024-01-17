import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweet.js";
import multer from "multer";

const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
      const uniquesuffix= Date.now()+'-'+Math.random(Math.random()*1e9);
      const fileExtention= file.originalname.split('.').pop();
      cb(null,file.fieldname+'-'+uniquesuffix+'.'+fileExtention);
  }
})

const fileFilter= (req,file,cb)=>{
  const allowedFileTypes=/jpeg|jpg|png/;
  const extname= allowedFileTypes.test(file.originalname.toLowerCase());
  const mimetype=allowedFileTypes.test(file.mimetype);

  if(extname && mimetype){
      return cb(null,true);
  }else{
      cb("Error only JPEG/PNG/JPG files allowed");
  }
}

const upload= multer({
  storage:storage,
  limits:{
      fileSize:1024*1024*5 //Allow 5 MB
  },
  fileFilter:fileFilter
})

const router = express.Router();

router.post("/", upload.single('picture'), verifyToken, createTweet);

router.delete("/:id", verifyToken, deleteTweet);

router.put("/:id/like", likeOrDislike);

router.get("/timeline/:id", getAllTweets);

router.get("/user/all/:id", getUserTweets);

router.get("/explore", getExploreTweets);
export default router;
