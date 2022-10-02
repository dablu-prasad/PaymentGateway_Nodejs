import express from 'express';
import { changeUserPassword, forgotPassword, login, logout, resetpassword, resetpassword1 } from '../controller/LoginController.js';
import { getprofileimage, register, settingdetail } from '../controller/RegisterController.js';
import { auth } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';



const userRoute =  express.Router();
userRoute.post('/login',login);
userRoute.get('/logout',logout);
userRoute.post('/register',uploadImage,register);
userRoute.get('/profileimage',auth,getprofileimage);
userRoute.get('/setting',auth,settingdetail);
userRoute.put('/changepassword',auth,changeUserPassword);
userRoute.put('/forgotpassword',forgotPassword);
userRoute.get('/resetpassword/:id/:token',resetpassword);
userRoute.post('/resetpassword/:id/:token',resetpassword1);
export default userRoute;