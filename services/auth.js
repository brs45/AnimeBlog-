
const jwt=require('jsonwebtoken');

const secreat="@zololuffy";

 function creatToken(user){

  const paylode={
 
    _id:user._id,
    email:user.email,
   role:user.role

  }

   const token=jwt.sign( paylode,secreat);
   return token;
 }

function validatetoken(token){

 const verify=jwt.verify(token,secreat);
 return verify;

}

module.exports={
    creatToken,
    validatetoken
};



