import ErrorHandler from "../utils/errorhander.js";

const ErrorHander=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message || "Internal Server Error";
    console.log(err.statusCode)
    console.log(err.message)
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
}

export default ErrorHander;