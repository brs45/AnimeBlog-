
const { validatetoken }=require('../services/auth');

function cheeckauthenticationcookie(cookieName){

  return (req,res,next)=>{

    const tokenName=req.cookies[cookieName];

    if(!tokenName){
         return  next();
    }

    try {
        const paylode= validatetoken(tokenName);
        req.user=paylode;
      
    } catch (error) {
        
    }

   return  next();



  }






}



module.exports={cheeckauthenticationcookie};

