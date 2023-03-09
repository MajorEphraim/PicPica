import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../styles/NavBar.css'
import { HiMenu } from "react-icons/hi";
import { BiX } from "react-icons/bi";
import { BiRepost, BiRefresh } from "react-icons/bi";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
  import { useSelector, useDispatch } from 'react-redux'
  import { openDrawer, closeDrawer} from '../redux/slices/drawerSlice'

  import UserDetails from './UserDetails';

  import avatar from '../pictures/avatar.png'
  import icon from '../pictures/icon_b.png'

const NavBarHome =({attemptsLeft, isDemo, reset})=>{

    const name = useSelector(state=>state.accountState.username)
    const profilePic = useSelector(state=>state.accountState.profilePic)
    const isOpened = useSelector(state=>state.drawerState.isOpen)

    const token = useSelector(state=>state.authState.token)
 
    const [isDisplayed, setIsDisplayed] = useState(false)
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth

    const dispatch = useDispatch()
    const navigate = useNavigate()


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

    const hasAccount = ()=>{

        if(token == null){
            return (
            <div className='sign-in-container' onClick={()=>navigate('/login')}>
                    <h1 className='sign-in-up'>Sign in / Sign up</h1>
            </div>
            )
        }else{
            return(
               <UserDetails showUserDetails={showUserDetails}/>

            )
        }
    }

    const changeMode = ()=>{
        if (isDemo) {
            navigate('/')
        } else {
            navigate('/demo')
        }
    }

    const height = windowWidth > 400 ? null:.068*windowWidth
    const width = height
    const menuMargin = windowWidth > 400 ? null:.04*windowWidth
    const icon1Style = windowWidth > 400 ? {color:'#491aaa', padding:0}:{color:'#491aaa', padding:0, fontSize:.035*windowWidth}
    const resetStyle = windowWidth > 400 ? {color:'#491aaa', margin:0,}:{color:'#491aaa', margin:0, fontSize:.012*windowWidth}

    return(
        <div className='bar-home' style={{}}>
        
                        <div className='icon-menu'>
                            {
                                isOpened ? <BiX className='menu' onClick={triggerCloseDrawer}/> : <HiMenu className='menu' onClick={ !isDemo ? triggerOpenDrawer:null } style={!isDemo ? {color:'#ffffff', height,width } : {color:'transparent', height,width, margin:menuMargin}}/>
                            }
                            
                            <img src={icon} className="icon" style={windowWidth > 400 ? {}:{height:.068*windowWidth, width:.068*windowWidth}}/>
                            {
                                isDemo ? (
                                    <>
                                        <div className='demo-mode' style={windowWidth > 400 ? {}:{height:.045*windowWidth, width:.06*windowWidth}}>
                                            <h1 className='demo-text' style={windowWidth > 400 ? {}:{fontSize:.015*windowWidth, fontWeight:700}}>DEMO</h1>
                                        </div>
                                        <div onClick={()=>reset()} className='refresh-btn' style={windowWidth > 400 ? {width:"55px", borderRadius: "10px", height: "fit-content",backgroundColor:'#ffffff',display:'flex', flexDirection:'column', alignItems:'center'}:{height:.045*windowWidth,width:.06*windowWidth ,fontWeight:700, backgroundColor:'#ffffff', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                            <BiRefresh className='refresh-icon' style={icon1Style}/>
                                            <h6 className='refresh-btn-txt' style={resetStyle}>Reset</h6>
                                        </div>
                                    </>
                                    
                                ):(
                                    <div className='demo-mode-t'>
                                        <h1 className='demo-text-t'>DEMO</h1>
                                    </div>
                                )
                            }
                        </div>
                        <h1 className='attempt-left' style={windowWidth > 400 ? {}:{fontSize:.031*windowWidth}}>{attemptsLeft}</h1>
                        <div className='right-content' style={windowWidth > 400 ? {}:{width:'fit-content'}}>
                        <BiRepost className='mode-icon' onClick={token == null ? null : changeMode} style={{color :token == null ? 'transparent' : '#ffffff', fontSize:windowWidth > 400 ? null:.06*windowWidth, margin:windowWidth > 400 ? null:0}}/>
                        {isDemo ? (hasAccount()):<UserDetails showUserDetails={showUserDetails}/>}
                        </div>
        </div>
    )
}

export default NavBarHome