import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../styles/NavBar.css'
import { HiMenu } from "react-icons/hi";
import { BiX } from "react-icons/bi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import { useSelector, useDispatch } from 'react-redux'
  import { openDrawer, closeDrawer} from '../redux/slices/drawerSlice'

  import avatar from '../pictures/avatar.png'
  import icon from '../pictures/icon_b.png'

const NavBarHome =({attemptsLeft})=>{

    const name = useSelector(state=>state.accountState.username)
    const profilePic = useSelector(state=>state.accountState.profilePic)
    const isOpened = useSelector(state=>state.drawerState.isOpen)

    // const [isOpened, setIsOpened] = useState(opened)
    const [isDisplayed, setIsDisplayed] = useState(false)
    const dispatch = useDispatch()


    const showUserDetails = ()=>{
        if (isDisplayed) {
            const userDetailsContainer = document.getElementById("account")
            userDetailsContainer.style.display = "none"
            setIsDisplayed(false)
        } else {
            const userDetailsContainer = document.getElementById("account")
            userDetailsContainer.style.display = "flex"
            setIsDisplayed(true)    
        }
    }

    const triggerOpenDrawer=()=>{
        const drawer = document.getElementById('drawer')
        drawer.style.display = "flex"
        drawer.style.animationName = "open-drawer"
        drawer.style.animationDuration = ".7s"
        // drawer.style.animationDirection = 'forwards'
        dispatch(openDrawer())
        //drawer.style.position.left= 0;
        // drawer.classList.add('animate');
    }

    const triggerCloseDrawer=()=>{
        const drawer = document.getElementById('drawer')
        drawer.style.animationName = "close-drawer"
        drawer.style.animationDuration = ".7s"
        // drawer.style.animation = "close-drawer ease-in 5s linear"

        dispatch(closeDrawer())

        //drawer.style.position.left= "-25%";
        
        // drawer.style.animation.name = 'open-drawer';
        // drawer.style.animation.direction = 'forward';
        // drawer.classList.add('animate');
    }

    return(
        <div className='bar-pay'>
        
                        <img src={icon} className="icon"/>
                        <div onClick={showUserDetails} className='user-details'>
                            <h6 className='username'>{name}</h6>
                            <img src={profilePic == null ? avatar : profilePic} className="profile-pic"/>
                        </div>
        </div>
    )
}

export default NavBarHome