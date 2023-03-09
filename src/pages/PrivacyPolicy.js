import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/PrivacyPolicy.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import {storeToken} from '../redux/slices/authSlice'
  import { signIn } from '../functions/authFunctions'
  import logo from '../pictures/icon.png'

const PrivacyPolicy =()=>{
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
        <div className="terms-container">
            <NavBar/>
            <div className="logo-container">
                <img className="logo" src={logo}/>
            </div>

                <h1 className="terms-text">Privacy Policy</h1>
            <Footer/>
        </div>
    )
}

export default PrivacyPolicy