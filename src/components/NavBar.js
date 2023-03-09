import React, {useState, useEffect} from 'react';
import '../styles/NavBar.css'
import avatar from '../pictures/avatar.png'

import { HiMenu } from "react-icons/hi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Account from './Account';
import { useSelector } from 'react-redux'

const NavBar =()=>{
    const token = useSelector(state=>state.authState.token)
    const name = useSelector(state=>state.accountState.username)
    const profilePic = useSelector(state=>state.accountState.profilePic)

    const showUserDetails = ()=>{
        const userDetailsContainer = document.getElementById("details-container")
        userDetailsContainer.style.display = "block"
    }
    return(
        <div className='bar'>
            <div className='auth-texts'>
            <Link to={'/register'} style={{textDecoration:'none'}}> 
            {
                token == null ?(
                    <h6 className='forgot-password'>forgot password</h6>
                ):(
                    <div onClick={showUserDetails} className='user-details'>
                        <h6 className='username'>{name}</h6>
                        <img src={profilePic == null ? avatar : profilePic} className="profile-pic"/>
                    </div>
                )
            }
            </Link>
            </div>  
        </div>
    )
}

export default NavBar