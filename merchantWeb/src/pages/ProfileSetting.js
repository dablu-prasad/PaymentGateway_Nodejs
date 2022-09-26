import { Button, Container, Form, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import '../css/settingscreen.css';
import Axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../utils/utils'
function ProfileSetting() {

  const [settingdetails, setsettingdetails] = useState('');

  console.log(settingdetails);
  useEffect(() => {
    Axios({
      method: 'get',
      url: `/users/setting`
    }).then(function (res) {
      setsettingdetails(res.data)
    })
      .catch(function (error) {
        toast.error(getError(error));
      });
  }, [])


  return (
    <div >
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Sidebar />
          </Col>
          <Col>
            <Row>
              <Col>
                {console.log(settingdetails[0]?.address)}

                <div className='container'>

                  <Table className='setscreen-t-t1'>

                    <tr className='setscreen-t2'>
                      <th>Setting</th>
                    </tr>

                    <tr className='setscreen-t2'>
                      <td>Bussiness Name</td>
                      <td>{settingdetails[0]?.bussiness_name}</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Website</td>
                      <td>{settingdetails[0]?.website}</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Contect Person</td>
                      <td>{settingdetails[0]?.name}</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Email</td>
                      <td>{settingdetails[0]?.emailid}</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Address</td>
                      <td>{settingdetails[0]?.address}</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Country</td>
                      <td>{settingdetails[0]?.country}</td>
                    </tr>
                    <tr className='setscreen-t3'>
                      <td>Verification status</td>
                      {settingdetails[0]?.verification_status==='0'?
                      <td>
                        <div style={{ width: '100%', height: '88px' }}>
                          <p style={{ textAlign: 'right', marginBottom: '0px' }}>
                            *pending </p>
                          <p className='text-secondary' style={{ textAlign: 'left', marginLeft: '5px', fontSize: '15px' }}>
                            Know Your Bussiness(KYB) is pending.Please mail us your documents if not done already to start collecting payments.
                          </p>
                        </div>
                      </td>
                      :<p>Success</p>}
                    </tr>


                  </Table>


                  <Table className='setscreen-t-t2'>

                    <tr className='setscreen-t2'>
                      <th>Login Details</th>
                    </tr>

                    <tr className='setscreen-t2'>
                      <td>Username</td>
                      <td>{settingdetails[0]?.emailid} (Google)</td>
                    </tr>
                    <tr className='setscreen-t3'>
                      <td>Password</td>
                      <td>********** <Link to="/changepassword">change password</Link></td>
                    </tr>
                  </Table>

                  <Table className='setscreen-t-t3'>

                    <tr className='setscreen-t2'>
                      <th>Limits</th>
                    </tr>

                    <tr className='setscreen-t2'>
                      <td>Daily receiving limit</td>
                      <td>50,000 AED (equivalent)</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Annual receiving limit</td>
                      <td>5,000,000 AED (equivalent)</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Daily withdrawal limit</td>
                      <td>60,000 AED</td>
                    </tr>
                    <tr className='setscreen-t3'>
                      <td>Annual withdrawal limit</td>
                      <td>5,000,000 AED (equivalent)</td>
                    </tr>

                  </Table>

                  <Table className='setscreen-t-t4'>

                    <tr className='setscreen-t2'>
                      <th>Preference</th>
                    </tr>

                    <tr className='setscreen-t2'>
                      <td>Cryptocurrency</td>
                      <td><img src="tether.png" className='curr-logo' />USDT <img src="bitcoin.png" className='curr-logo' />BTC<img src="eth.png" className='curr-logo' />ETH<img src="USDC1.png" className='curr-logo' />USDC</td>
                    </tr>
                    <tr className='setscreen-t2'>
                      <td>Flat</td>
                      <td><img src="AED.png" className='curr-logo' />AED</td>
                    </tr>
                    <tr className='setscreen-t3'>
                      <td>Conversion Rule</td>
                      <td>Auto conversion from crypto to fiat</td>
                    </tr>

                  </Table>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>


      </Container>


    </div>

  )
}

export default ProfileSetting