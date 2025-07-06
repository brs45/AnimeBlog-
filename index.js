
const express=require('express');
const path=require('path');
const port=3000;
const app=express();

const mongoose=require('mongoose');
const cookie=require('cookie-parser');
const {cheeckauthenticationcookie}=require('./middleware/authentication');
const userrout=require('./routes/userrout');
const blogroyt=require('./routes/blogrout');
const blogs=require("./models/bloge");
const comment=require("./models/comment");
mongoose.connect('mongodb://localhost:27017/blogapp');
app.use(cookie());
app.use(express.json("")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

app.set("view engine","ejs");

app.set("views",path.resolve("./views"));


app.use(cheeckauthenticationcookie("token"))



app.use("/",userrout);
app.use("/blog",blogroyt);
app.get("/",async(req,res)=>{

    const allblogs=await blogs.find({});
    const comments=await comment.findOne({})
     res.render('index',{
        user:req.user,
        blog:allblogs
     });
})

app.listen(port,()=>{
    console.log('listining on port 3000');
});



