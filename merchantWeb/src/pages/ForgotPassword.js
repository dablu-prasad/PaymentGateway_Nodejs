import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../css/forgotpassword.css'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../utils/utils'
import swal from 'sweetalert';
const ForgotPassword = () => {

   const [email,setemail]= useState("");
   console.log(email);

   useEffect(() => {
   
 }, [])

 const handleforgetpass=(e)=>{
    e.preventDefault();
    Axios({
    method: 'put',
    url: `/users/forgotpassword`,
    data: {
       email
     },
     headers: {
       'Content-Type': 'application/json'
     }
  }).then(function (res) {
      console.log(res);
      if(res.data.status==='success')
      {
        swal({
            title: "Success",
            text: res.data.message,
          })
      }
      else if(res.data.status==='wrong')
      {
        swal({
            title: "Error",
            text: res.data.message,
          })
      }
     

  })
    .catch(function (error) {
      toast.error(getError(error));
    });

   }

  return (
    <div >
  <Form className='fgtpass-f1' onSubmit={handleforgetpass} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Please enter a email id:-</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>{setemail(e.target.value)}}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Reset Password
      </Button>
    </Form>
  </div>
  )
}

export default ForgotPassword