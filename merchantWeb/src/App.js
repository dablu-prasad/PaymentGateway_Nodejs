import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar,NavDropdown,Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {BiLogIn} from "react-icons/bi"
import "./App.css"
import Createinvoice from './pages/Createinvoice';
import Invoiceform from './pages/Invoiceform';
import InvoiceDetail from './pages/InvoiceDetail';
import { useEffect, useState } from 'react';
import AccountDetail from './pages/AccountDetail';
import ProfileSetting from './pages/ProfileSetting';
import { Logout } from './services/action/action';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import SupportPage from './pages/SupportPage';
import AllTransection from './pages/AllTransection';
import BalancePage from './pages/BalancePage';
import OverviewPage from './pages/OverviewPage';
import RegistrationPage from './pages/RegistrationPage';
import Axios from 'axios';
import { getError } from './utils/utils';
window.Buffer = require('buffer/').Buffer;

function App() {
  const[name,setname]=useState();
  // const navigate = useNavigate();
  const [logoutimg,setlogoutimg]=useState();
  const userInfo=useSelector((state)=>state.userreducer.userInfo);
  console.log(name?.name);

  const base64String=null;
 useEffect(()=>{
  setname(localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):[])

  Axios({
    method: 'get',
    url: `/users/profileimage`,
  }).then(function (res) {
    setlogoutimg(res.data)  
    console.log(res.data);
    // navigate('/');
  })
    .catch(function (error) {
      toast.error(getError(error));
    });

    
 },[])

 const dispatch=useDispatch();
  const signouthandler=()=>{
    dispatch(Logout())
  localStorage.removeItem('UserInfo')
  }



  
  return (
    <Router>
    <div className="App">
    <ToastContainer position="bottom-center" limit={1} />
      {/* <Navbar bg='light'>
      <LinkContainer to='/'>
            <Navbar.Brand><img className='navlogo' src="barterpaylogo.png" alt="img"></img></Navbar.Brand>
            </LinkContainer>
            </Navbar> */}

<div className="d-flex flex-column site-container">
      <Navbar bg="light" >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img className="barterlogo " src="barterpaylogo.png" alt="logo"></img>
            </Navbar.Brand>
          </LinkContainer>
          
          <Nav className="mb-2 px-5">
                       {userInfo?
                        //  logoutimg.map((singleData)=>{
                        //   console.log(singleData.images.data);
                        //   base64String = btoa(String.fromCharCode(...new Uint8Array(singleData.images.data))) 
                       ( 
                              
                        <>         
                        <Nav.Link href="#home"><img className="loginlogo" src='' alt=""/></Nav.Link>
                       <NavDropdown title={userInfo?.name}  id="basic-nav-dropdown"> 
              <NavDropdown.Item className="navitem"> <Link className="dropdown-item"
                to='/'
                onClick={signouthandler}
                ><BiLogIn/> Logout</Link></NavDropdown.Item>            
            </NavDropdown>
            </>
            )
          //  })
            : null}  
          </Nav>
        </Container>
      </Navbar>
    </div>
        
      <main>
        <Container className="mt-3" fluid>
      <Routes>
      <Route exact path="/" element={<Login/>}/>
     <Route exact path="/dashboard" element={<Dashboard/>}/>
      <Route exact path="/invoice" element={<Createinvoice/>}/>
      <Route exact path={`/account/`} element={<AccountDetail/>}/>
      <Route exact path="/setting" element={<ProfileSetting/>}/>
      <Route exact path="/form" element={<Invoiceform/>}/>
      <Route exact path="/invoicedetail/:id" element={<InvoiceDetail/>}/>
      <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route exact path="/changepassword" element={<ChangePassword/>}/>
      <Route exact path="/support" element={<SupportPage/>}/>
      <Route exact path="/transection" element={<AllTransection/>}/>
      <Route exact path="/balance" element={<BalancePage/>}/>
      <Route exact path="/overview" element={<OverviewPage/>}/>
      <Route exact path="/register" element={<RegistrationPage/>}/>
        </Routes>        
        </Container>
        </main>
    </div>
    </Router>
  );
}

export default App;