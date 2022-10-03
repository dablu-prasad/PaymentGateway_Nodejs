
import bcrypt from 'bcrypt'
import {pool} from '../DBconn/data.js'

export const register = async (req, res, next) => {
    try{       
        const user=req.body;
        const imageurl=req.file;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(user.password, salt);
        pool.query(`select emailid from user WHERE emailid=?`, [user.email], (err, result, feilds) => {
            if (result.length > 0) {
                res.status(400).send({ message: "EmailId already exist!" });
            }
        }
        );
        const query = "insert into user( emailid, salt, password, usertype, name, bussiness_name, website, address, country, verification_status, images) values(?,?,?,?,?,?,?,?,?,?,?)";
        if(user.password===user.confirmpassword)
        {
            console.log("Hello");
        pool.query(query, [ user.email, salt, secPass, user.usertype,user.name,user.bussname,user.website,user.address,user.country,'0',imageurl.filename], (err, results) => {
            console.log("Hello");
            if (err) {
                console.log(err);
            }
            else {
                return res.status(200).json({ status:"Success",message: "Registered Successfully" });
            }
        })
    }
    else
    {
         res.status(200).json({status:"Wrong",message:"password and confirm password not match"})
    }
    }
    catch(error)
    {
        return res.status(400).json(error)
        console.log("Hello");
    }
}

export const settingdetail = async (req, res, next) => {

    pool.query(`select * from user where userid=?`,[req.logindata.userid], (err, result, feilds) => {
        if (err) {
            return res.json(err);
        }
        return res.send( result )
        console.log(result)   
    })
}


export const getprofileimage = async (req, res, next) => {
    pool.query(`select images from user where userid=?`,[req.logindata.userid], (err, result, feilds) => {
        if (err) {
            return res.json(err);
        }
        return res.send(result )
    })

}