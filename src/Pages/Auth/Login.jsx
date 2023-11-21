import React from "react";
import "./login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  
  const login = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/");
      // User signed up successfully.
    } catch (error) {
      // Handle error.
      console.error(error);
    }
  };
  return (
    <>
    <div className="login">
        <div className="wrapper">
          <form onSubmit={login}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                Dont't have an account? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
