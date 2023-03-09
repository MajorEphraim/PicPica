import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/TsandCs.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 
  import logo from '../pictures/icon.png'

const TsandCs =()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [isVisible, setIsVisible] = useState(null)
    const dispatch = useDispatch()

    return(
        <div className="terms-container">
            <NavBar/>
            <div className="logo-container">
                <img className="logo" src={logo}/>
            </div>

                <h1 className="terms-text">Terms and conditions</h1>

<div className='terms-topic'>
    <h1 className='topic-header'>
    1. Introduction
    </h1>
    <h6 className='terms-body'>These terms and conditions are the legal binding agreement between you (“You”, “User”, “They”) and PicPica (“Us”, “Company”, “We”).  They aim to make the user aware of the platform before deciding to use it. All the policies of the company, procedures and rights and responsibilities of both the user and the company are disclosed here. 
        You agree to our terms of use by clicking and making the checkbox “checked” and by creating an account. When the terms of use are updated or changed, the user will always be notified. We automatically assume that the user has agreed on the current (new/updated) terms of use when they continue to use the platform even after the day new terms of use became effective.
    </h6>

</div>

<div className='terms-topic'>
    <h1 className='topic-header'>
    2. Personal information
    </h1>
    <h5 className='terms-body'>Personal information is needed so that you can have your account and make it easy for you to recognize it. It also makes it easier for the communication between you and PicPica.</h5>
    <h5 className='terms-body'>Here is a list of the personal information we store:</h5>
    <ul className='terms-body'>
        <li >Username</li>
        <li>Email address</li>
        <li>Profile picture</li>
    </ul>
    <h5 className='terms-body'>
We store your username which does not necessarily need to be your real name to make you identifiable by a name and to use it as a reference for payments. Your email address will be used to send messages and notifications to you about your withdrawals and other updates related to PicPica.
</h5>
<h5 className='terms-body'>Your profile picture which is optional is stored to make your account quickly and easily identifiable to you every time after signing in the platform. You can remove your profile picture anytime and it will immediately be removed and no longer be available on our database and storage.</h5>
</div>


<div className='terms-topic'>
    <h1 className='topic-header'>
    3. Vouchers
    </h1>
    <h5 className='terms-body'>PicPica allows you to “top up” your account with following vouchers:</h5>
    <ul className='terms-body'>
        <li >1ForYou voucher</li>
        <li>Blu voucher</li>
        <li>OTT voucher</li>
    </ul>
    <h5 className='terms-body'>The purchase of correct voucher is your responsibility. If you purchase used or expired voucher PicPica will not be responsible if it fails to load in your account. 
PicPica will take responsibility for the following cases:
</h5>
</div>

<div className='terms-topic'>
    <h1 className='topic-header'>
    4. Payments / Withdrawals
    </h1>
    <h5 className='terms-body'>We allow you to make a withdrawal of a minimum of R20 if you are in South Africa. You cannot withdraw the amount you just loaded in your account until you have used it on a game. This is to prevent additional avoidable charges on a company. PicPica currently gives the following options to withdraw your money:</h5>
    <ul className='terms-body'>
        <li>Cash send</li>
        <li>E-wallet</li>
        <li>Banking details</li>
    </ul>
    <h5 className='terms-body'>You will receive your money within 24 hours if your withdrawal is not done during weekend. If you make a withdrawal during weekend, you will receive your payment on Monday (given that it is not a public holiday) because of a law of working hours and days. You will automatically have R20 which is not withdrawable in your account but to make you familiar with game and environment without using your money.</h5>
</div>

<div className='terms-topic'>
    <h1 className='topic-header'>
    5. Betting / Playing the game
    </h1>
    <h5 className='terms-body'>Betting is your own responsibility. PicPica will not be responsible for any amount of money you lost during betting. A healthy internet connection is required for a fair experience. You are always required to enter a stake to prevent auto bets or unintentional bets (mistakes). Once you have initiated a bet, you can no longer withdraw/cancel it. Bets interrupted by a network connection will be continued when the connection has been restored. You automatically initiate a bet by playing the game.</h5>
    <h5 className='terms-body'>You must have a minimum amount of R1 (if you are using Rands) to be able to play the game. A maximum amount of R10 000 is allowed as a stake per round. </h5>
</div>

<div className='terms-topic'>
    <h1 className='topic-header'>
    6. Your responsibilities
    </h1>
    <h5 className='terms-body'>Always keep your log in details safe. PicPica will not be responsible someone else get access to your account. Always make sure you log out if you were using a public computer to prevent someone else from accessing your account.</h5>
</div>

<div className='terms-topic'>
    <h1 className='topic-header'>
    7. Our responsibilities
    </h1>
    <h5 className='terms-body'>We will only be responsible for the following:</h5>
    <ul className='terms-body'>
        <li>There is a healthy internet connection but PicPica fails to sign in</li>
        <li>You won the game but the your balance did not increase.</li>
        <li>Voucher loads successfully but the amount in your account does not change.</li>
        <li>Voucher loads successfully but incorrect/insufficient amount reflects in your account.</li>
    </ul>
</div>


<div className='terms-topic'>
    <h1 className='topic-header'>
    8. Age restrictions
    </h1>
    <h5 className='terms-body'></h5>
</div>
       
            <Footer/>
        </div>
    )
}

export default TsandCs