import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import Axios from 'axios'
import { toast } from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { getError } from '../utils/utils'
import { useParams } from 'react-router-dom'
const InvoiceDetail = () => {
  const { id } = useParams()
  console.log(id);
  const [detail, setinvoice] = useState()
  console.log(detail);
  useEffect(() => {
    
    Axios({
      method: 'get',
      url: `/invoice/invoicedetail/${id}`,
    }).then(function (res) {
      setinvoice(res.data)

    })
      .catch(function (error) {
        toast.error(getError(error));
      });
  }, [])
  return (
    <div>
      <Row>
        <Col xs={3} lg={3}>
          <Sidebar />
        </Col>
        <Col>
          <table class="table">
            <thead class="thead-dark">
              <tr >
                <th scope="col">Invoice ID : {id}</th>
                <th scope="col" className='table-data2'><Button>Void Invoice</Button></th>
                
              </tr>
            </thead>
            <tbody>
              {detail?.map((ele) => {
                return (<>
                  <tr>
                    <td>Amount Requested</td>
                    <td className='table-data2'>{ele.amount}{ele.currency}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td className='table-data2'>{ele.createDate}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className='table-data2'>{ele.status}
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>

                    <td className='table-data2'>{ele.description}
                    </td>
                  </tr>
                  <tr>
                    <td>Customer email</td>
                    <td className='table-data2'>{ele.customer_email}
                    </td>
                  </tr>

                  <tr>
                    <td>Invoice Link</td>
                    <td className='table-data2'>https://barterpay.com/invoice/{ele.externalID}
                    </td>
                  </tr>                 
                </>)
              })}

            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}

export default InvoiceDetail