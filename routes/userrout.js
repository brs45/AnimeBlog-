const express = require('express');
const User = require('../models/user'); // Renamed for clarity
const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
 
  try {
     const token = await User.matchPassword(email, password);
     return res.cookie("token",token).redirect("/");
  } catch (error) {
      res.render(('signin'),{error:"incorrect password"});
      
  }

});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password }); 
  res.redirect('/');
});

router.get('/logout',(req, res)=>{
   res.clearCookie("token").redirect('/');
})



module.exports = router;



