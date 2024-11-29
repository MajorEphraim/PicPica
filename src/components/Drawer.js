import React, {useState, useEffect} from 'react';
import '../styles/Drawer.css'
import { HiMenu } from "react-icons/hi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import { useSelector, useDispatch } from 'react-redux'
  import { openDrawer, closeDrawer} from '../redux/slices/drawerSlice'

const Drawer =()=>{
    const date = new Date()
    const dispatch = useDispatch()

    const openLoadModal = ()=>{
        const container = document.getElementById('container')
        const innerContainer = document.getElementById('inner-container')
        container.style.display = 'block'
        innerContainer.style.display = 'block'
    }

    // const openWithdrawModal = ()=>{
    //     const container = document.getElementById('container-w')
    //     const innerContainer = document.getElementById('inner-container-w')

    //     container.style.display = 'block'
    //     innerContainer.style.display = 'block'
    // }


    return(
        <div className='drawer' id='drawer'
        >
            <div className='upper-container'>

                <div className='buttons'>
                    <div className='btn1' onClick={openLoadModal}>
                        <h1 className='btn-text1'>Load Voucher</h1>
                    </div>
                    <div className='btn2'>
                        <h1 className='btn-text2'>Withdraw</h1>
                    </div>
                </div>
                <div className='links'>
                    <Link style={{textDecoration:'none'}} to={'/terms&conditions'} onClick={()=>dispatch(closeDrawer())}> 
                    <h6 className='terms-conditions'>Terms & Conditions</h6>
                    </Link>
                    <Link style={{textDecoration:'none'}} to={'/privacy-policy'} onClick={()=>dispatch(closeDrawer())}> 
                    <h6 className='privacy-policy'>Privacy Policy</h6>
                    </Link>
                    <Link style={{textDecoration:'none'}} to={'/help'} onClick={()=>dispatch(closeDrawer())}> 
                    <h6 className='help'>Help</h6>
                    </Link>
                    <Link style={{textDecoration:'none'}} to={'/about'} onClick={()=>dispatch(closeDrawer())}> 
                    <h6 className='about'>About</h6>
                    </Link>
                    <Link style={{textDecoration:'none'}} to={'/faqs'} onClick={()=>dispatch(closeDrawer())}> 
                    <h6 className='faqs'>FAQs</h6>
                    </Link>
                </div>  
 
            </div>
            <div className='app-info'>
                <h6 className='about-text'>@PicPica {date.getFullYear()}</h6>
            </div> 
        </div>
    )
}

export default Drawer