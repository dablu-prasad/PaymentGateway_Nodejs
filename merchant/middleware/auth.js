
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import  jwt from 'jsonwebtoken';

export const auth= catchAsyncErrors(async(req,res,next)=>{
//   console.log(req.cookies);
//    const {token}= req.cookies; 
// console.log(req.session);
const {token}= req.cookies; 
   if(!token)
   {
   res.status(401).send({message:"Please Login to access to this resource"})
   }
   const decodeData=jwt.verify(token,process.env.JWT_SECRET);

   req.logindata=decodeData;
   next()
})

