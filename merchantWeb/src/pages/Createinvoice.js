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
function Createinvoice() {
    const navigate = useNavigate();
    const [invoice, setinvoice] = useState(null)

    const userInfo = useSelector((state)=>state.userreducer.userInfo)
    console.log(invoice);
    const handleclick = () => {
        navigate('/form')
    }
    const move = (id) => {
        navigate(`/invoicedetail/${id}`)
    }



    useEffect(() => {
     //   const id =  localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):[];
        Axios({
            method: 'get',
           // url: `/invoice/invoicelist/${userInfo.id}`,
           url: `/invoice/invoicelist`
        }).then(function (res) {
            setinvoice(res.data)

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

                                <div className='d-flex justify-content-between align-items-center createInvoice' >
                                    <h5 className='invoice-heading'>Invoices</h5>
                                    <Button className='invoice-btn d-flex align-items-center' onClick={handleclick}><AiOutlinePlus />Create Invoice</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {invoice?.length > 0 ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Created Date</th>
                                                <th>Invoice ID</th>
                                                <th>Customer </th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {invoice?.map(ele => {
                                                return (<tr onClick={() => move(ele.invoiceid)}>
                                                    <td> {ele.createDate}</td>
                                                    <td>{ele.invoiceid}</td>
                                                    <td>{ele.customer_name}</td>
                                                    <td>{ele.amount}</td>
                                                    <td>{ele.status}</td>

                                                </tr>)

                                            })}


                                        </tbody>
                                    </Table>) : (
                                    <div className='mt-5'><h6>No invoices yet</h6></div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Container>


        </div>

    )
}

export default Createinvoice