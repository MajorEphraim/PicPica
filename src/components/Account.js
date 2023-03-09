import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../styles/Account.css'
import avatar from '../pictures/avatar.png'
import { signOutUser } from '../functions/authFunctions'
import updateDetails from '../functions/updateDetails'
import { useSelector } from 'react-redux'
import { auth, updateProfile, signOut,storage, ref, uploadBytes,getDownloadURL, db, doc, updateDoc } from '../firebase/configs'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";

const Account = ({isDemo, amount})=>{

    const username = useSelector(state=>state.accountState.username)
    const email = useSelector(state=>state.accountState.email)
    const balance = useSelector(state=>state.accountState.balance)
    const profilePic = useSelector(state=>state.accountState.profilePic)

    const [name, setName] = useState(username)
    const [pic, setPic] = useState(profilePic)
    const [errM, setErrM] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    
    const handleClick = async()=>{
        try {

            const errorMsg = await signOutUser()
            navigate('/login')
            setErrM(errorMsg)
        } catch (error) {
            setErrM(error.message)
        }
    }

    const handleFile = (event) =>{
        const files = event.target.files
  
        const image = files[0]
        const type = image.type
        const name = image.name
    
        const reader = new FileReader();
        reader.onload = async function(evt) {

            setIsLoading(true)
            try {
                const arrayBuffer = evt.target.result
                const blob = new Blob([arrayBuffer], { type })
                
                const storageRef = ref(storage, 'profile pictures/'+name);
                const snapshot = await uploadBytes(storageRef, blob)
                const url = await getDownloadURL(snapshot.ref)
                await updateDetails({profilePic:url})
                setIsLoading(false)

            } catch (error) {
                setErrM(error.message)
                setIsLoading(false)
            }
          

        };
        reader.readAsArrayBuffer(image);
        
      }

      const updateName = async(value)=>{

        setName(value)
        if (value.length >0) {
            try {
                await updateDetails({username:value})
            } catch (error) {
                setErrM(error.message)
            }
        }
      }

      useEffect(()=>{

        return async()=>{
            if (username.length > 0) {
                try {
                    await updateDetails({username:name})
                } catch (error) {
                    setErrM(error.message)
                }
            }
        }
      },[])

      useEffect(()=>{
        setName(username)
        setPic(profilePic)
      },[username, profilePic])

    return(
        <div className='account-container' id='account'>
            <div className='account-details'>
                <div className='image-picker'>
                    <img className='pic' src={pic == null || pic == ''? avatar: pic}/>
                    <input type='file' onChange={e=>handleFile(e)} className='picker'/>
                    <div className='loader' style={{ zIndex: isLoading ? 3:-3  }}>
                        <AiOutlineLoading3Quarters/>
                    </div>
                </div>
                <input type={'text'} value={name} className="name" onChange={e=>updateName(e.target.value)}/>
                <h2 className='email'>{email}</h2>
                <div className='account-balance'>
                    <h1>Balance</h1>
                    <h2>R { !isDemo ? balance : amount}</h2>
                </div>
            </div>
            <h4 style={{color:'red'}}>{errM}</h4>
            <div className='auth-container'>
                <h2>Delete account</h2>
                <div className='logout-btn' onClick={handleClick}>
                    <h1 className='logout-txt'>Log out</h1>
                </div>
            </div>
        </div>
    )
}

export default Account
