import express from 'express';
import invoiceRoute from './route/InvoiceRouter.js';
import userRoute from './route/UserRouter.js';
import dotenv from 'dotenv';
import accountRouter from './route/AccountRouter.js';
import errorMiddleware from './middleware/error.js';
import cookieParser  from 'cookie-parser';
import session from 'express-session'
const app=express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

//Middleware
app.use(errorMiddleware);

// // app.use(session({secret:'thisissecrest',resave:false,saveUninitialized:true,
// cookie:{maxAge:20000,}}))

//Route import
app.use('/invoice',invoiceRoute);
app.use('/users',userRoute);
app.use('/account',accountRouter);


app.listen(5001,console.log("server running ..."));

// //create database
// export const pool = createPool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     connectionLimit:10 
// })
