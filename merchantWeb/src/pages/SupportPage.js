import {Container, Form } from 'react-bootstrap'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import '../css/accountdetail.css';

function SupportPage() {
     

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
                            <div style={{width:911}}>
                                <table className='acc-tab-border' >  
                                           
                                    <tr className='acc-tab-border-t1'>
                                    <th>Support</th>
                                    </tr>  
                                   <div style={{marginLeft:'20px'}}>
                                   <p>
                                    For any assistance please contact your relationship manager OR  mail us at <br/>
                                    <Form.Label style={{fontWeight:'bold'}}>merchant_support@barter.tech</Form.Label>. Do include the below details while writing to us:
                                    </p>
                                 <br/>
                                <p>*  Your Business name</p> 
                                <p>* Merchant ID assigned by BarterPay (Refer Settings section)</p>
                                <p>* Correspond using your registered email id</p>
                                </div>
                                 </table>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Container>


        </div>

    )
}
export default SupportPage