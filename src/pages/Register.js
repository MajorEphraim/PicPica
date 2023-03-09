import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import './Register.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import { signUp } from '../functions/authFunctions'

const Register =()=>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState(null)
    const [isVisible, setIsVisible] = useState(null)
    
    const runSignUp = async()=>{
        setErrorMsg(null)
        if (username =='' || email =='' || password =='') {
            setErrorMsg("All fields are required")
            return
        }
        if (password != confirmPassword) {
            setErrorMsg("Your passwords does not match")
            return
        }
        try {
            setIsVisible(true)
            const errorMsg = await signUp(username,email,password)
            setErrorMsg(errorMsg)
            setIsVisible(false)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    return(
        <div className='container'>
           <NavBar page={'Register'}/>
           <div className='inner-container'>
             <div className='card'>
                <h1>Register here</h1>
                <div className='inner-card-register'>
                    <div className='invisible-card'>
                        <div>
                            <h6 className='register-text'>Username</h6>
                            <input type={'text'} className='register-input'/>
                        </div>
                        <div>
                            <h6 className='register-text'>Cell number</h6>
                            <input type={'number'} className='register-input'/>
                        </div>
                        <div>
                            <h6 className='register-text'>Email</h6>
                            <input type={'email'} className='register-input'/>
                        </div>
                        <div>
                            <h6 className='register-text'>Password</h6>
                            <input type={'password'} className='register-input'/>
                        </div>
                        <div>
                            <h6 className='register-text'>Confirm password</h6>
                            <input type={'password'} className='register-input'/>
                        </div>
                    <button className='register-btn' onClick={runSignUp}>
                        {/* <Link to={'/login'}> */}
                            <h6>Register</h6>
                        {/* </Link> */}
                    </button>
                    </div>
                </div>
                <h6 className='error-msg'>{errorMsg ? errorMsg : null}</h6>
                <Link to={'/terms_and_conditions'}>
                <h4 className='ts-cs'>Terms and conditions</h4>
                </Link>

             </div>
           </div>
        </div>
    )
}

export default Register