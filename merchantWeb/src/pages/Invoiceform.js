import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getError } from "../utils/utils";
import { toast } from "react-toastify";

function Invoiceform() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
      desc : "",
      email : "",
      name : "",
      id : "",
      amount : "",
      curr_sym : "",
  })
console.log(form);

useEffect(()=>{
  const id =  localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):[];
  setForm({...form, id : id.id})
},[])

const handlelogin = async (e) => {
  e.preventDefault();
  
  await Axios({
    method: 'post',
    url: '/invoice/create',
    data: {
      form
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    console.log(res)
    navigate('/invoice');
  })
    .catch(function (error) {
      toast.error(getError(error));
    });
}
return (
  <div>
    <Row>
      <Col xs={3} lg={3}>
        <Sidebar />
      </Col>
      <Col xs={8} sm={5} md={7} lg={9}>
        <Form onSubmit={handlelogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="mt-4">Description</Form.Label>
            <Form.Control className="w-50" type="email" placeholder="Enter email" value={form.desc} onChange={(e) => setForm({...form, desc : e.target.value})} />
          </Form.Group>
          <div className="d-flex justify-content">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="mt-4">Customer Name <Form.Text className="text-muted ml-1">
          (optional)
        </Form.Text></Form.Label>
              <Form.Control type="text" placeholder="name" value={form.name} onChange={(e) => setForm({...form, name : e.target.value})} />
            </Form.Group>
              
            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Label className="mt-4 mx-5">Customer Email<Form.Text className="text-muted mx-1">
          (optional)
        </Form.Text></Form.Label>
              <Form.Control className="mx-5" type="text" placeholder="name"  value={form.email} onChange={(e) => setForm({...form, email : e.target.value})}/>
            </Form.Group>
          </div>
          <div className="d-flex mt-5">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label >Set fixed price</Form.Label>
              <Form.Control type="text" placeholder="Enter fixed price" value={form.amount} onChange={(e) => setForm({...form, amount : e.target.value})}/>
            </Form.Group>
            <Form.Group
              className="mb-3 mt-2"
              controlId="formBasicPassword"
            >
                 <Form.Label></Form.Label>
                <Form.Select value={form.curr_sym} onChange={(e) => setForm({...form, curr_sym : e.target.value} ) }>
              <option value="AED" >AED</option>
              <option value="inr" >inr</option>
            </Form.Select>
            </Form.Group>
            
          </div>
          <Form.Label className="mt-2">Ask for additional Information <Form.Text className="ml-1 text-muted">
          (optional)
        </Form.Text> </Form.Label>
          <Form.Group className="mb-3 mt-2 d-flex " controlId="formBasicCheckbox">
          
            <Form.Check type="checkbox" label="Name" />
            <Form.Check className='mx-3' type="checkbox" label="Email Address" />
            <Form.Check className='mx-3' type="checkbox" label="Address" />
            <Form.Check  className='mx-3' type="checkbox" label="Phone Number" />
          </Form.Group>
         
          <div className="">
          <Button variant="outline-primary"   type="submit">
            Cancel
          </Button>
          <Button variant="outline-primary" className="ml-5 buttonform" type="submit" onClick={handlelogin}>
            create new invoice
          </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </div>
);
}

export default Invoiceform;