import express from 'express';
import { accountdetail } from '../controller/AccountController.js';

const accountRouter =  express.Router();
accountRouter.get('/accountdetail/:id',accountdetail);
export default accountRouter;