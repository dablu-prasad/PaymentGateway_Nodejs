import express from 'express';
import invoiceRoute from './route/InvoiceRouter.js';
import userRoute from './route/UserRouter.js';
import dotenv from 'dotenv';
import accountRouter from './route/AccountRouter.js';
import errorMiddleware from './middleware/error.js';



const app=express();
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set("view engine", "ejs");

//Route import
app.use('/invoice',invoiceRoute);
app.use('/users',userRoute);
app.use('/account',accountRouter);

app.use(errorMiddleware);

app.listen(5001,console.log("server running ..."));
