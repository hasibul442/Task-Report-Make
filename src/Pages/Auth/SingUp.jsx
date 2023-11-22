import React from 'react'
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Link, useLocation, useNavigate} from 'react-router-dom'

function SingUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const signUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
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
          <form onSubmit={signUp}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="input-box">
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                Already have and Account <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SingUp