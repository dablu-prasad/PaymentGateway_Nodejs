import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { CgSupport } from 'react-icons/cg'
import { HiOutlineCash, HiOutlineCurrencyDollar, HiOutlineViewBoards } from 'react-icons/hi'
import { TbClipboardText } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="mt-4">
   
        <ul>
          <li className="mt-3">
            <Link className="link" to={"#"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <HiOutlineViewBoards size={25} />
                  <p className="sidebar-text">Overview</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"/invoice"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <TbClipboardText size={25} />
                  <p className="sidebar-text">Invoices</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"#"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <HiOutlineCash size={25} />
                  <p className="sidebar-text">Balances</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"/account"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <BsBook size={22} />
                 <p className="sidebar-text"> Accounts</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"#"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <HiOutlineCurrencyDollar size={25} />
                  <p className="sidebar-text">Transaction</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"#"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <CgSupport size={25} />
                  <p className="sidebar-text">Support</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-5">
            <Link className="link" to={"/setting"}>
              <div className="sidebar">
                <div className="sidebar-inner">
                  <AiOutlineSetting size={25} />
                  <p className="sidebar-text">Settings</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
     
  </div>
  )
}

export default Sidebar