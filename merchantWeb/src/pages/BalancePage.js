import { Button, Container, Form, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { getError } from '../utils/utils'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import '../css/balancepage.css';
function BalancePage() {


    return (
        <div >
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <Sidebar />
                    </Col>
                    <Col>
                         
                        <Row>
                            <Col> <table className='acc-tab-border-bal' >  
                                       <tr className='acc-tab-border-t1-bal' >     
                                           <th>Currency</th>
                                           <th>Amount</th>
                                           <th>Est. Value</th>
                                           <th>Action</th>
                                           </tr>
                                            
                                        <tbody style={{overflowY:'scroll' ,overflowX:'hidden', border:0}} >
        
                                                 <tr className='acc-tab-border-t1-bal' > 
                                                    <td>AED</td>
                                                    <td>1300000</td>
                                                    <td>1300000</td>
                                                 <Link to='#'>withdraw</Link>
                                                    </tr>
                                                    <tr className='acc-tab-border-t1-bal' > 
                                                    <td>AED</td>
                                                    <td>1300000</td>
                                                    <td>1300000</td>
                                                 <Link to='#'>withdraw</Link>
                                                    </tr>
                                                    <tr className='acc-tab-border-t1-bal' > 
                                                    <td>AED</td>
                                                    <td>1300000</td>
                                                    <td>1300000</td>
                                                 <Link to='#'>withdraw</Link>
                                                    </tr>
                                                    <tr className='acc-tab-border-t1-bal' > 
                                                    <td>AED</td>
                                                    <td>1300000</td>
                                                    <td>1300000</td>
                                                 <Link to='#'>withdraw</Link>
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

export default BalancePage