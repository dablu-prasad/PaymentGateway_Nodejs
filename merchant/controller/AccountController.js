import { pool } from "../DBconn/data.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

export const accountdetail=catchAsyncErrors(async(req,res,next)=>
{
      console.log(req.params.id);
      pool.query(`select bank_name,acc_no,currency from accountdetails where userid=?`,[req.params.id], (err, result, feilds) => {
            if (err) {
                return res.json(err);
            }
            console.log(result);
            return res.send( result )
        })
})