import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar';
import './LogIn.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import {storeToken} from '../redux/slices/authSlice'
  import { signIn } from '../functions/authFunctions'

const LogIn =()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [isVisible, setIsVisible] = useState(null)
    const dispatch = useDispatch()

    const handleClick = async()=>{
        setErrorMsg(null)
        if (email =='' || password =='') {
            setErrorMsg("Both your email and password are required")
            return
        }
        try {
            setIsVisible(true)
            const errorMsg = await signIn(email,password)
            setErrorMsg(errorMsg)
            setIsVisible(false)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return(
        <div className='container'>
           <NavBar page={'Login'}/>
           <div className='inner-container'>
             <div className='card'>
                    <h1>Login here</h1>
                    <div className='inner-card'>
                        <div className='invisible-card'>
                        <div>
                            <h6 className='register-text'>Email</h6>
                            <input type={'email'} className='register-input'/>
                        </div>
                        <div>
                            <h6 className='register-text'>Password</h6>
                            <input type={'password'} className='register-input'/>
                        </div>
                    <button className='register-btn' onClick={handleClick}>
                            <h6>Log in</h6>
                    </button>
                    </div>
                </div>
                <h6 className='error-msg'>{errorMsg ? errorMsg : null}</h6>
             </div>
           </div>
        </div>
    )
}

export default LogIn