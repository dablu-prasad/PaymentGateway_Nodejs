import { pool } from "../DBconn/data.js";
import bcrypt from 'bcrypt'
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";


export const register = catchAsyncErrors(async (req, res, next) => {
        const { name, emailId, password, usertype } = req.body;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        pool.query(`select emailid from user WHERE emailid=?`, [emailId], (err, result, feilds) => {
            if (result.length > 0) {
                res.status(400).send({ message: "EmailId already exist!" });
            }
        }
        );
        const query = "insert into user(name,emailid,salt,password,usertype) values(?,?,?,?,?)";
        pool.query(query, [name, emailId, salt, secPass, usertype], (err, results) => {
            if (err) {
            }
            else {
                return res.status(200).json({ message: "Registered Successfully" });
            }
        })
}) 