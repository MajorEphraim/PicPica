import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import AuthPage from '../pages/Auth';
import Home from '../pages/Home';
import TsandCs from '../pages/TsandCs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Help from '../pages/Help';
import About from '../pages/About';
import FAQs from '../pages/FAQs';
import Payments from '../pages/Payments';
import Demo from '../pages/Demo';

import { useDispatch, useSelector } from 'react-redux'
import { auth, onAuthStateChanged } from '../firebase/configs'
import { updateToken } from '../redux/slices/authSlice'
import { updateSize } from '../redux/slices/windowSlice'
import {getDetails} from '../functions/fetchDetails'


const AppRouter = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const dispatch = useDispatch()

    const token = useSelector(state=>state.authState.token)
    const windowSize = useSelector(state=>state.windowState.windowSize)

    const getWindowSize = () =>{
      const { innerWidth, innerHeight } = window
      
      return { innerWidth, innerHeight }
    }
  
    useEffect(()=>{
      const handleWindowSize = ()=>{
        dispatch(updateSize(getWindowSize()))
      }

      window.addEventListener('resize', handleWindowSize)

      return () =>{
        window.removeEventListener('resize', handleWindowSize)
      }
    },[])

    onAuthStateChanged(auth, async(user) => {
     
        // if (navigator.onLine) {
        //   setErrorMsg(null)
        // } else {
        //   setErrorMsg("You are offline");
        // }
      
        if (user) {

          const uid = user.uid;
          dispatch(updateToken(uid))
          
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            // if(user.emailVerified){
              // setIsLoading(true)
              // try {
              //   const errorM = await getDetails()
              //   setErrorMsg(errorM)
              //   setIsLoading(false)
              // } catch (e) {
              //   setErrorMsg(e.message)
              //   setIsLoading(false)
              // }
    
            // }
          // ...
        } else {
     
          console.log("user is signed out or not connected")
        }
      });


    return (
        <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="register" element={<AuthPage/>} />
                <Route path="login" element={<AuthPage/>} />
                <Route path="terms&conditions" element={<TsandCs/>} />
                <Route path="privacy-policy" element={<PrivacyPolicy/>} />
                <Route path="help" element={<Help/>} />
                <Route path="about" element={<About/>} />
                <Route path="faqs" element={<FAQs/>} />
                <Route path="payments" element={<Payments/>} />
                <Route path="demo" element={<Demo/>} />
              </Routes>
            </div>
        </Router>
      );
}

export default AppRouter