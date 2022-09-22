import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import "../css/login.css"
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../services/action/action';
function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const dispatch=useDispatch();
  const [showPass, setpass] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const userInfo = useSelector((state)=>state.userreducer.userInfo)

  const clickHandler = () => {
    setpass(true);
  }

  useEffect(()=>{
    if(userInfo){
      navigate("/dashboard");
    }
  },[navigate,userInfo])

  const handlelogin = async (e) => {
    e.preventDefault();
    dispatch(login({email,password}))   
  }
  return (
    <>
      <div className="login">
        <h3>Login to BarterPay</h3>
        <Form onSubmit={handlelogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Your Email Address" onChange={(e) => setemail(e.target.value)} />
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <InputGroup.Text ><i onClick={clickHandler} className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}></i></InputGroup.Text>
          </InputGroup>
          <Form.Label className='login-fgtpass'><Link to={'/forgotpassword'} style={{ textDecoration: 'none' }}>Forgot your password ?</Link></Form.Label>
          <button className='login-b1' type="submit">
            Log in
          </button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}><Form.Text className='text-muted' >Don't have an account? <Link to={'#'} style={{ textDecoration: 'none' }}>Create one</Link></Form.Text></div>
          <div className='login-or'>
            <hr className='login-or-line1' /><p> OR</p>  <hr className='login-or-line2' />
          </div>
          {/* 
        <button className='login-b2' type="submit">
         Login with Google
      </button>
      <button className='login-b3' type="submit">
         Login with Apple
      </button> */}
        </Form>




      </div>
    </>

  )
}

export default Login