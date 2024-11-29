import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../components/NavBar';
import '../styles/LogIn.css';
import { signIn } from '../functions/authFunctions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const handleClick = async () => {
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg('Both your email and password are required');
      return;
    }
    try {
      const errorMsg = await signIn(email, password);
      setErrorMsg(errorMsg);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container">
      <NavBar page="Login" />
      <div className="inner-container">
        <div className="card">
          <h1>Login here</h1>
          <div className="inner-card">
            <div className="invisible-card">
              <div>
                <h6 className="register-text">Email</h6>
                <input
                  type="email"
                  className="register-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <h6 className="register-text">Password</h6>
                <input
                  type="password"
                  className="register-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button className="register-btn" onClick={handleClick}>
                <h6>Log in</h6>
              </button>
            </div>
          </div>
          {errorMsg && <h6 className="error-msg">{errorMsg}</h6>}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
