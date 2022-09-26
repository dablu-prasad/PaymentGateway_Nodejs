import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../utils/utils'
import Axios from 'axios';
import swal from 'sweetalert';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ChangePassword = () => {
  const userInfo = useSelector((state) => state.userreducer.userInfo)
  console.log(userInfo);
  const [oldpassword, setoldpass] = useState('')
  const [newpassword, setpass] = useState('')
  const [newconfirmpassword, setconfirmpass] = useState('')
  const navigate=useNavigate('')

  const onhandlechgepass = (e) => {
    e.preventDefault();
    Axios({
      method: 'put',
      //url: `/users/changepassword/${userInfo.id}`,
      url: `/users/changepassword`,
      data: {
        oldpassword,
        newpassword,
        newconfirmpassword
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.status === 'success') {
        swal({
          title: "Success",
          text: res.data.message,
        })

      navigate("/setting");
      }
      else if (res.data.status === 'failed') {
        swal({
          title: "Error",
          text: res.data.message,
        })
      }
    })
  }


  return (
    <div className='container w-50'>
      <Form onSubmit={onhandlechgepass} >

      <h3>Change Password</h3><br/>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control placeholder="Old Password" onChange={(e) => setoldpass(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" onChange={(e) => setpass(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control placeholder="Confirm Password" onChange={(e) => setconfirmpass(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Change Password</Button>
      </Form>
    </div>
  )
}

export default ChangePassword