// Create Token and saving in cookie
import session from 'express-session'
import jwt from "jsonwebtoken"
export const sendToken = (email,name,userid, statusCode, res) => {
    // const token = email.getJWTToken();

  const token=   jwt.sign({ email: email ,userid:userid}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,});
  
   // options for cookie
    const options = {
       expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
     res.status(statusCode).cookie("token", token, options).json({
      success: true,
      email,
      name,
      userid,
      token,
    });

  };
  

  