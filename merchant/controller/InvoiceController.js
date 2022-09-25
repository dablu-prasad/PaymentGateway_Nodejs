
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import {pool} from '../DBconn/data.js'
export const createinvoice = catchAsyncErrors(async (req, res, next) => {
    let product = req.body.form;
  
    const query = "insert into invoice(externalID,createDate,updateDate,description,customer_name,customer_email,marchantid,amount,currency,status) values('BAR001',curdate(),curdate(),?,?,?,?,?,?,'pending')";
    pool.query(query, [product.desc, product.name, product.email,product.id,  product.amount, product.curr_sym,], (err, results) => {
        console.log(err)
        if (!err) {
             return res.status(200).json({ message: "Invoice added Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

export const invoicelist = catchAsyncErrors(async (req, res, next) => {
   
    pool.query(`select * from invoice where marchantid=?`,[req.logindata.userid] ,(err, result, feilds) => {
        console.log(err)
        if (err) {
            return res.json(err);
        }
        return res.json( result )
    })
})

export const invoicedetail = catchAsyncErrors(async (req, res, next) => {

    pool.query(`select * from invoice where invoiceid=?`,[req.params.id], (err, result, feilds) => {
        console.log(err)
        if (err) {
            return res.json(err);
        }
        return res.json( result )
    })
})
