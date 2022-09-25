
import express from 'express';
import { createinvoice,invoicedetail,invoicelist } from '../controller/InvoiceController.js';
import { auth } from '../middleware/auth.js';


const invoiceRoute=express.Router();
invoiceRoute.post('/create',auth,createinvoice);
invoiceRoute.get('/invoicelist',auth,invoicelist);
invoiceRoute.get('/invoicedetail/:id',auth,invoicedetail)
export default invoiceRoute;