import express from "express";
import {
  getUser,
  update,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
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

router.post("/update-profile/",upload.single('picture'), verifyToken, update);

router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);

router.put("/follow/:id", verifyToken, follow);

router.put("/unfollow/:id", verifyToken, unFollow);

export default router;
