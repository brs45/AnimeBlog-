
const express = require('express');
const User = require('../models/bloge'); // Renamed for clarity
const router = express.Router();
const multer  = require('multer');
const path=require('path');
const Blog=require('../models/bloge');
const Comment=require('../models/comment');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uplode`));
    },
    filename: function (req, file, cb) {
         const filename=`${Date.now()}-${file.originalname}`;
         cb(null,filename);
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/new-blog",(req,res)=>{
    return res.render("addblog",{user:req.user});
})


router.post("/",upload.single("animeImage"),async(req,res)=>{
  const {animeTitle,animeComment}=req.body;


  const blog = await Blog.create({
    title: animeTitle,
    body: animeComment,
    createdby: req.user._id, 
    coverImage: `/uplode/${req.file.filename}`
  });

 return res.redirect(`/blog/${blog._id}`)
    

})

router.post("/comment/:blogId",async(req,res)=>{

  await Comment.create({
    comment:req.body.comment,
    blogId:req.params.blogId,
    createdby:req.user._id
  })
 return res.redirect(`/blog/${req.params.blogId}`);

})



router.get("/:id",async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdby");
  const comment=await Comment.find({blogId:req.params.id}).populate("createdby");
 return  res.render("blog",{
    user:req.user,
    blog,
    comment
 })
})



module.exports = router;