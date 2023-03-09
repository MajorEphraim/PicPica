import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import avatar from '../pictures/avatar.png'

const UserDetails = ({showUserDetails})=>{
    const name = useSelector(state=>state.accountState.username)
    const profilePic = useSelector(state=>state.accountState.profilePic)
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth

    return(
        <div onClick={()=>showUserDetails()} className='user-details' style={windowWidth > 400 ? {}:{margin:.014*windowWidth}}>
            <h6 className='username' style={windowWidth > 400 ? {}:{fontSize:.024*windowWidth,marginLeft:0}}>{name}</h6>
            <img src={profilePic == null ? avatar : profilePic} className="profile-pic" style={windowWidth > 400 ? {}:{width:.065*windowWidth, height:.065*windowWidth}}/>
        </div>
    )
}

export default UserDetails