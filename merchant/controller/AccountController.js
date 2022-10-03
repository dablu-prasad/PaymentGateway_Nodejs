
import { pool } from '../DBconn/data.js'

export const accountdetail = async (req, res, next) => {
    try {
        pool.query(`select bank_name,acc_no,currency from accountdetails where userid=?`, [req.logindata.userid], (err, result, feilds) => {
            if (err) {
                return res.json(err);
            }
            return res.send(result)

        })
    }
    catch (error) {
        return res.status(404).json(error);
    }
}