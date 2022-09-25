
import {pool} from '../DBconn/data.js'
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

export const accountdetail=catchAsyncErrors(async(req,res,next)=>
{
      pool.query(`select bank_name,acc_no,currency from accountdetails where userid=?`,[req.logindata.userid], (err, result, feilds) => {
            if (err) {
                return res.json(err);
            }
            return res.send( result )
       
        })
    })