
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import  jwt from 'jsonwebtoken';

export const auth= catchAsyncErrors(async(req,res,next)=>{
try{
const {token}= req.cookies; 
   
   const decodeData=jwt.verify(token,process.env.JWT_SECRET);

   req.logindata=decodeData;
   next()
}
catch(error)
{
  // return res.status(401).json(error);
}
})

