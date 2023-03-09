import React, {useState, useEffect} from 'react';
import '../styles/Footer.css'
import { HiMenu } from "react-icons/hi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import avatar from '../pictures/avatar.png'
  import icon from '../pictures/icon_b.png'

const Footer =()=>{
    const date = new Date()
    return(
        <div className='footer'>
            <div className='content-container'>
                <div className='links'>
                    <Link to={'/help'} style={{textDecoration:'none'}}> 
                    <h6 className='help-f'>Help</h6>
                    </Link>
                    <Link to={'/terms&conditions'} style={{textDecoration:'none'}}> 
                    <h6 className='terms-conditions-f'>Terms & Conditions</h6>
                    </Link>
                    <Link style={{textDecoration:'none'}} to={'/privacy-policy'}> 
                    <h6 className='privacy-policy-f'>Privacy Policy</h6>
                    </Link>
                    <Link to={'/about'} style={{textDecoration:'none'}}> 
                    <h6 className='about-f'>About</h6>
                    </Link>
                    <Link to={'/contact'} style={{textDecoration:'none'}}> 
                    <h6 className='contact-us-f'>Contact us</h6>
                    </Link>
                </div>  

                <div className='app-info'>
                    <h6 className='forgot-password'>@PicPica {date.getFullYear()}</h6>
                </div> 
            </div>
        </div>
    )
}

export default Footer