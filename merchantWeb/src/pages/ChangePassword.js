import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../utils/utils'
import Axios from 'axios';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ChangePassword = () => {
    const userInfo = useSelector((state)=>state.userreducer.userInfo)
             console.log(userInfo)
    const [password,setpass]=useState()
    const [password_confirmation,setconfirmpass]=useState()

    const onhandlechgepass=(e)=>{
        e.preventDefault();
    Axios({   
    method: 'put',
    url: `/users/changepassword/${userInfo.id}`,
    data: {
       password,
       password_confirmation
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
      else if(res.data.status==='failed')
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
    <div>
    <Form onSubmit={onhandlechgepass}>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control placeholder="Password"   onChange={(e)=>setpass(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control placeholder="Confirm Password"  onChange={(e)=>setconfirmpass(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit">Change Password</Button>
  </Form>
  </div>
  )
}

export default ChangePassword