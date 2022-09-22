import { pool } from "../DBconn/data.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/utils.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";

export const login = catchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  pool.query(`select * from user WHERE emailid=?`, [email], (err, result, next) => {
    if (err) {
      return res.json(err);
    }
    if (result.length > 0) {
      if (bcrypt.compareSync(pass, result[0].password)) {
        res.send({
          email: result[0].emailid,
          name: result[0].name,
          userid: result[0].userid,
          token: generateToken(result),
        });
        return;
      }
    }

    res.status(401).send({ message: "invalid email or password" });
  }
  );
});


export const changeUserPassword = catchAsyncErrors(async (req, res) => {
  const { password, password_confirmation } = req.body
  if (password && password_confirmation) {
    if (password !== password_confirmation) {
      res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
    } else {
      const salt = await bcrypt.genSalt(10)
      const newHashPassword = await bcrypt.hash(password, salt)

      pool.query(`update user set salt=?,password=?  where userid=?`, [salt, newHashPassword, req.params.id], (err, results) => {
        console.log(results)
        return res.send({ "status": "success", "message": "Password changed succesfully" })
      })
    }
  } else {
    res.send({ "status": "failed", "message": "All Fields are Required" })
  }
})

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
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
});

export const resetpassword = catchAsyncErrors(async (req, res) => {
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
        res.render("resetpass", { userid: verify.userID, status: "Not Verified"  });
        //return res.send({ "status": "ok", userid: verify.userID})
      }

      console.log(verify);
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  })
});


export const resetpassword1 = catchAsyncErrors(async (req, res) => {
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
            res.render("resetpass", { userid: verify.userID, status: "verified", "message": "Reset password succesfully"  });
           //return res.send({ "status": "success", "message": "Reset password succesfully" })
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
});