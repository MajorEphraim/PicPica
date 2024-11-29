import React, { useState } from "react";
import '../styles/Auth.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import logo from '../pictures/icon.png';
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from '../functions/authFunctions';

const AuthPage = () => {
    const [page, setPage] = useState('Login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const changePage = () => {
        if (page === "Login") {
            setPage("Register");
            navigate('/register');
        } else {
            setPage("Login");
            navigate('/login');
        }
    };

    const putUsername = (value) => {
        setUsername(value);
        setErrorMsg(null);
    };

    const putEmail = (value) => {
        setEmail(value);
        setErrorMsg(null);
    };

    const putPassword = (value) => {
        setPassword(value);
        setErrorMsg(null);
    };

    const putConfirmPassword = (value) => {
        setConfirmPassword(value);
        setErrorMsg(null);
    };

    const runSignUp = async () => {
        setErrorMsg(null);
        if (username === '' || email === '' || password === '') {
            setErrorMsg("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg("Your passwords do not match");
            return;
        }
        try {
            setIsVisible(true);
            const errorMsg = await signUp(username, email, password);
            setErrorMsg(errorMsg);
            setIsVisible(false);
            changePage();
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    const runSignIn = async () => {
        setErrorMsg(null);
        if (email === '' || password === '') {
            setErrorMsg("Both your email and password are required");
            return;
        }
        try {
            setIsVisible(true);
            const errorMsg = await signIn(email, password);
            navigate('/');
            setErrorMsg(errorMsg);
            setIsVisible(false);
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="everything">
            <div className="auth-container">
                <NavBar />
                <div className="logo-container">
                    <img className="logo" src={logo} alt="Logo" />
                </div>
                <div className="welcome-container">
                    <h1 className="welcome-text">Welcome to PicPica</h1>
                </div>
                <div className="lower-container">
                    <div className="texts">
                        <div>
                            <h1 className="subheadings">Do you?</h1>
                            <h2>like playing games</h2>
                            <h2>wanna make quick cash</h2>
                            <h2>wanna enjoy playing games while making money</h2>
                        </div>
                        <div>
                            <h1 className="subheadings">PicPica</h1>
                            <h2>allows you to do all of the</h2>
                            <h2>listed above at the same time</h2>
                        </div>
                    </div>
                    <div className="login-content">
                        <h1 className="text-login">{page === "Login" ? "Login here" : "Register here"}</h1>
                        <div className="fields">
                            {page === 'Register' ? (
                                <>
                                    <input className="text-inputs" type="text" placeholder="Username" onChange={(e) => putUsername(e.target.value)} value={username} />
                                    <input className="text-inputs" type="email" placeholder="Email" onChange={(e) => putEmail(e.target.value)} value={email} />
                                    <input className="text-inputs" type="password" placeholder="Password" onChange={(e) => putPassword(e.target.value)} value={password} />
                                    <input className="text-inputs" type="password" placeholder="Confirm password" onChange={(e) => putConfirmPassword(e.target.value)} value={confirmPassword} />
                                </>
                            ) : (
                                <>
                                    <input className="text-inputs" type="email" placeholder="Email" onChange={(e) => putEmail(e.target.value)} value={email} />
                                    <input className="text-inputs" type="password" placeholder="Password" onChange={(e) => putPassword(e.target.value)} value={password} />
                                </>
                            )}
                            <div className="btn-login" onClick={page === "Login" ? runSignIn : runSignUp}>
                                <h2 className="btn-text">{page === "Login" ? "Log in" : "Register"}</h2>
                            </div>
                            <h3 onClick={changePage} className="text-account">{page === "Login" ? "Don't have an account?" : "Go login"}</h3>
                            <h6 className='error-msg'>{errorMsg ? errorMsg : null}</h6>
                            <h6 className='error-msg'>{isVisible ? "...loading" : null}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthPage;
