import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import countryList from 'react-select-country-list'
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import Axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
function RegistrationPage() {
  const [value, setValue] = useState('')
  const [usertype, setusertype] = useState('')
  const [imageurl, setimage] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    bussname: "",
    website: "",
    address: "",
  })
  console.log(form);
  console.log(usertype);
 
  const changeHandler = value => {
    setValue(value)
  }
  
  const uploadimg= (e)=>{
    if(e.target && e.target.files[0])
    {
      const formData = new FormData();      
      formData.append('file',e.target.files[0])
      for (let obj of formData) {
        setimage(obj);
      }
  }
  }
  const handleregister = async (e) => {

    e.preventDefault();
    console.log(imageurl);
    await Axios({
      method: 'post',
      url: '/users/register',
      data: {
        form,
        usertype,
        value,
        imageurl
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.status === 'success') {
        swal({
          title: "Success",
          text: res.data.message,
        })
      }
      else if (res.data.status === 'Wrong') {
        swal({
          title: "Error",
          text: res.data.message,
        })
      }
      navigate('/');
    })
      .catch(function (error) {
        toast.error(getError(error));
      });
  }



  return (
    <div className='container w-50' style={{ marginBottom: '50px' }}>
      <Form onSubmit={handleregister}>
        <h3>Registration Form</h3><br />
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter merchant name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={form.confirmpassword} onChange={(e) => setForm({ ...form, confirmpassword: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bussiness Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Bussiness name" value={form.bussname} onChange={(e) => setForm({ ...form, bussname: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" placeholder="Enter website name" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Select options={options} value={value} onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>UserType</Form.Label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='merchant' onChange={(e) => setusertype(e.target.value)} />
            <label class="form-check-label" for="flexRadioDefault1">
             merchant
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='user' onChange={(e) => setusertype(e.target.value)}/>
            <label class="form-check-label" for="flexRadioDefault2">
             user
            </label>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <div>
            <h4>Upload Photo</h4>
            <input type="file"  name='img' onChange={(e)=> uploadimg(e)} />
          </div>
        </Form.Group>


        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationPage