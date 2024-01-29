import React, { useEffect } from "react";
import "./login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from "react";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  let location = useLocation();

  const login = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let path = location.state?.from?.pathname || '/'; // default path is '/'
      navigate(path);

    } catch (error) {
      let errorMessage;
      if (error.code === 'auth/invalid-login-credentials') {
        errorMessage = 'No user found with this email.';
      } else {
        errorMessage = error.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
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
                {/* Dont't have an account? <Link to="/signup">Register</Link> */}
                Dont't have an account? <Link to="/">You Can't Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
