import express from 'express';
import { changeUserPassword, forgotPassword, login, logout, resetpassword, resetpassword1 } from '../controller/LoginController.js';
import { register } from '../controller/RegisterController.js';


const userRoute =  express.Router();
userRoute.post('/login',login);
userRoute.get('/logout',logout);
userRoute.post('/register',register);
userRoute.put('/changepassword/:id',changeUserPassword);
userRoute.put('/forgotpassword',forgotPassword);
userRoute.get('/resetpassword/:id/:token',resetpassword);
userRoute.post('/resetpassword/:id/:token',resetpassword1);
export default userRoute;