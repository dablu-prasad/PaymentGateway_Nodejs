
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { sendToken } from "../utils/jwttoken.js";
import { pool } from '../DBconn/data.js'

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    if (!email || !pass) {
      res.status(400).send({ message: "Please enter emailid and password" })
    }
    pool.query(`select * from user WHERE emailid=?`, [email], (err, result, next) => {
      if (err) {
        return res.json(err);
      }
      if (result.length > 0) {
        if (bcrypt.compareSync(pass, result[0].password)) {
          sendToken(result[0].emailid, result[0].name, result[0].userid, 200, res)
          return;
        }
      }
      res.status(401).json({ message: "invalid email or password" });
    }
    );
  }
  catch (error) {
    return res.status(404).json(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
  catch (error) {
    return res.status(404).json(error);
  }
};


export const changeUserPassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, newconfirmpassword } = req.body
    const salt = await bcrypt.genSalt(10)
    const newHashPassword = await bcrypt.hash(newpassword, salt)
    pool.query(`select * from user WHERE userid=?`, [req.logindata.userid], (err, result, feilds) => {
      if (result.length > 0) {
        if (oldpassword && newpassword && newconfirmpassword) {
          if (bcrypt.compareSync(oldpassword.toString(), result[0].password.toString())) {
            if (newpassword !== newconfirmpassword) {
              res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
              pool.query(`update user set salt=?,password=?  where userid=?`, [salt, newHashPassword, req.logindata.userid], (err, results) => {

                return res.send({ "status": "success", "message": "Password changed succesfully" })
              })
            }
          }
          else {
            res.send({ "status": "failed", "message": "old password is wrong" })
          }
        }
        else {
          res.send({ "status": "failed1", "message": "All Fields are Required" })
        }
      }
    }
    );
  }
  catch (error) {
    return res.status(404).json(error);
  }
}

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    pool.query(`select * from user WHERE emailid=?`, [email], (err, result, next) => {
      if (err) {
        return res.json(err);
      }
      console.log(result[0]);
      if (result.length < 1) {
        return res.send({ "status": "wrong", "message": "Please enter correct emailid" })
      }

      // Get ResetPassword Token
      const secret = process.env.JWT_SECRET + result[0].password;
      const token = jwt.sign({ userID: result[0].userid }, secret, { expiresIn: '1d' })
      const link = `http://localhost:5001/users/resetpassword/${result[0].userid}/${token}`
      console.log(link)

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dabluprasad563@gmail.com",
          pass: "solourfktaynyzux",
        },
      });

      var mailOptions = {
        from: "dabluprasad563@gmail.com",
        to: email,
        subject: "Password Reset",
        text: link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
      return res.send({ "status": "success", "message": "Reset Password link has been sent to your Emailid" })
    })
  }
  catch (error) {
    return res.status(404).json(error);
  }
};

export const resetpassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    console.log(req.params);
    pool.query(`select * from user WHERE userid=?`, [id], (err, result, next) => {
      console.log("result", result);
      if (err) {
        return res.json(err);
      }
      if (result.length < 1) {
        return res.send({ "status": "wrong", "message": "Please enter correct emailid" })
      }
      const secret = process.env.JWT_SECRET + result[0].password;
      console.log(secret);
      console.log(token);
      try {
        const verify = jwt.verify(token, secret);
        if (verify) {
          res.render("resetpass", { userid: verify.userID, status: "Not Verified" });
          //return res.send({ "status": "ok", userid: verify.userID})
        }

        console.log(verify);
      } catch (error) {
        console.log(error);
        res.send("Not Verified");
      }
    })
  }
  catch (error) {
    return res.status(404).json(error);
  }
};


export const resetpassword1 = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirmpassword } = req.body

    const salt = await bcrypt.genSalt(10)
    const newHashPassword = await bcrypt.hash(password, salt)

    pool.query(`select * from user WHERE userid=?`, [id], (err, result, next) => {
      if (err) {
        return res.json(err);
      }
      if (result.length < 1) {
        return res.send({ "status": "wrong", "message": "Please enter correct emailid" })
      }
      const secret = process.env.JWT_SECRET + result[0].password;
      const verify = jwt.verify(token, secret);
      try {
        if (password && confirmpassword) {
          if (password !== confirmpassword) {
            res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {
            pool.query(`update user set salt=?,password=?  where userid=?`, [salt, newHashPassword, req.params.id], (err, results) => {
              console.log(results)
              res.render("resetpass", { userid: verify.userID, status: "verified", "message": "Reset password succesfully" });
            })
          }
        } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }

      } catch (error) {
        console.log(error);
        res.send("Not Verified");
      }
    })
  }
  catch (error) {
    return res.status(404).json(error);
  }
};