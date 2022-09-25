import express from 'express';
import { accountdetail } from '../controller/AccountController.js';
import { auth } from '../middleware/auth.js';

const accountRouter =  express.Router();
accountRouter.get('/accountdetail',auth,accountdetail);
export default accountRouter;