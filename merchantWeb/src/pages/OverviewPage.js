import { Button, Container, Form, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import '../css/overview.css';
function OverviewPage() {
    return (
        <div >
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <Sidebar />
                    </Col>
                    <Col>

                        <Row>
                            <Col> <div className='acc-tab-border-over'>
                                 <p>Today's Sales</p>
                                 <p style={{fontSize:'20px',fontWeight:'bold'}}>600,000 AED</p>
                                 <div><Form.Label style={{fontSize:'18px',fontWeight:'bold'}}>4,800,000 AED</Form.Label> (month till date)</div>
                            </div>
                            </Col>
                            <Col> <div className='acc-tab-border-over' >
                               <p>Today's completed payment</p>
                               <p style={{fontSize:'20px',fontWeight:'bold'}}>3</p>
                              <div> <Form.Label style={{fontSize:'18px',fontWeight:'bold'}}>24 </Form.Label> payments(month till date)</div>
                            </div>
                            </Col>
                            <Col> <div className='acc-tab-border-over' >
                              <p>Pending invoices</p>
                              <p style={{fontSize:'20px',fontWeight:'bold'}}>2</p>
                           <div> Invoice value pending:<Form.Label style={{fontSize:'16px',fontWeight:'bold'}}> 500,000 AED</Form.Label></div> 
                            </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Container>


        </div>

    )
}
export default OverviewPage