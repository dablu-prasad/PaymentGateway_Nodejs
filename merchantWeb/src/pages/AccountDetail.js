import { Button, Container, Form, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import '../css/accountdetail.css';
import { getError } from '../utils/utils'
import { toast } from 'react-toastify'
import Axios from 'axios';
import Accdata from '../components/Accdata'
import { useSelector } from 'react-redux'
function AccountDetail() {

    const [accdata, setaccdata] = useState([]);
    const userInfo = useSelector((state) => state.userreducer.userInfo)

    console.log(accdata);
    useEffect(() => {
        // const id =  localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):[];
        // console.log(id);
        Axios({
            method: 'get',
            //  url: `/account/accountdetail/${userInfo.id}`,
            url: `/account/accountdetail`
        }).then(function (res) {
            setaccdata(res.data)

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
                                <div style={{ width: 911 }}>
                                    <Form.Label variant='light'>
                                        To make the changes to accounts and wallets please email to  </Form.Label> <Form.Label style={{ fontWeight: 'bold' }}>customersupport@barter.tech</Form.Label>

                                    <table className='acc-tab-border' >

                                        <tr className='acc-tab-border-t1'>
                                            <th>Bank Accounts</th>
                                        </tr>

                                        <tr className='acc-tab-border-t1 pl-5 ' >
                                            <th>Accounts</th>
                                            <th>A/C Number</th>
                                            <th>Currency</th>
                                        </tr>

                                        <tbody style={{ overflowY: 'scroll', overflowX: 'hidden', border: 0 }} >
                                            {accdata?.map((ele) => {
                                                return (<>
                                                    <tr className='acc-tab-border-t1' >
                                                        <td>{ele.bank_name}</td>
                                                        <td>{ele.acc_no}</td>
                                                        <td><p>{ele.currency}</p></td>
                                                    </tr>

                                                </>)

                                            })}
                                        </tbody>

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

export default AccountDetail