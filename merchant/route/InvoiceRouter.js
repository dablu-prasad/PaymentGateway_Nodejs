
import express from 'express';
import { createinvoice,invoicedetail,invoicelist } from '../controller/InvoiceController.js';

const invoiceRoute=express.Router();
invoiceRoute.post('/create',createinvoice);
invoiceRoute.get('/invoicelist/:id',invoicelist);
invoiceRoute.get('/invoicedetail/:id',invoicedetail)
export default invoiceRoute;