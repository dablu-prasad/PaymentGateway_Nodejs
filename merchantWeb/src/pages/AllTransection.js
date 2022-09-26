import { Button, Container, Form, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import '../css/alltransection.css';
function AllTransection() {

    return (
        <div >
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <Sidebar />
                    </Col>
                    <Col>

                        <Row>
                            <Col> <table className='acc-tab-border-tran' >

                                <tr className='acc-tab-border-t1-tran'>
                                    <th>All Transection</th>
                                </tr>

                                <tr className='acc-tab-border-t1-tran' >
                                    <th>Date</th>
                                    <th>Invoice ID</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                </tr>

                                <tbody style={{ overflowY: 'scroll', overflowX: 'hidden', border: 0 }} >

                                    <tr className='acc-tab-border-t1-tran' >
                                        <td>12-sept-2022</td>
                                        <td>123</td>
                                        <td>Receipt</td>
                                        <td>100 AED</td>
                                        <td>0.0099899BTC</td>
                                    </tr>
                                    <tr className='acc-tab-border-t1-tran' >
                                        <td>12-sept-2022</td>
                                        <td>123</td>
                                        <td>Receipt</td>
                                        <td>100 AED</td>
                                        <td>0.0099899BTC</td>
                                    </tr>
                                    <tr className='acc-tab-border-t1-tran' >
                                        <td>12-sept-2022</td>
                                        <td>123</td>
                                        <td>Receipt</td>
                                        <td>100 AED</td>
                                        <td>0.0099899BTC</td>
                                    </tr>
                                    <tr className='acc-tab-border-t1-tran' >
                                        <td>12-sept-2022</td>
                                        <td>123</td>
                                        <td>Receipt</td>
                                        <td>100 AED</td>
                                        <td>0.0099899BTC</td>
                                    </tr>

                                </tbody>

                            </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Container>


        </div>

    )
}


export default AllTransection