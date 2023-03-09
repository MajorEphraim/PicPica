import React, { useEffect } from "react";
import NavBar from "../components/NavBarPay";
import Footer from "../components/Footer";
import '../styles/Payments.css'
import logo from '../pictures/icon.png'
import { useDispatch, useSelector } from 'react-redux'
import fetchPayments from '../functions/fetchPayments'


const Payments =()=>{

    useEffect(()=>{
       //fetchPayments()
    },[])

    const payments = useSelector(state=>state.paymentsState.payments)
    return(
        <div className="payments-container">
            <NavBar/>
            <div className="payments-content">
            <div className="logo-container">
                <img className="logo" src={logo}/>
            </div>
            <h1 className="payments-text" >Payments</h1>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>
                            No.
                            </th>
                            <th>
                                Date requested
                            </th>
                            <th>
                                Username
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Method
                            </th>
                            <th>
                                Make payment
                            </th>
                        </tr>
                    </thead>

                    {
                        payments.map((payment, index)=>{
                            return(
                                <tr>
                                <td>
                                   {index+1}
                                </td>
                                <td>
                                    {payment.dateRequested}
                                </td>
                                <td>
                                {payment.username}
                                </td>
                                <td>
                                {payment.amount}
                                </td>
                                <td>
                                {payment.method}
                                </td>
                                <td>
                                    <div className="payments-btn">
                                        <h6 className="pay-text">Make payment</h6>
                                    </div>
                                </td>
                            </tr>
        
                            )
                        })
                    }

                </table>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Payments