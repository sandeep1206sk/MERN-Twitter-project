import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";

import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { username, password });
      dispatch(loginSuccess(res.data));
      // alert('login success')
      toast.success("login success full");
      navigate("/");
      
    } catch (error) {
      toast.error("user or password invalid");
      dispatch(loginFailed());
    }
  };


  return (
    <>
    <form className="w-50 m-auto mt-5 border border-2 border-info-subtle p-5 rounded-4 shadow-lg">
    <div className='text-center mb-3'>
        <i className="fa-brands fa-twitter fs-1"  style={{color: "#52c5ff",}} ></i>

            </div>
      <h1 className="text-center mb-5 fs-3 fw-bold">Login to Twitter</h1>
      <div className="form-floating mb-3 border border-info rounded">
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        id="floatingInput"
        placeholder="username"
        className="form-control"
      />
      <label for="floatingInput">username</label>
      </div>
      <div className="form-floating mb-3 border border-info rounded">
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="floatingPassword"
        placeholder="password"
        className="form-control"
      />
       <label for="floatingPassword">Password</label>
      </div>
      <div className="form-floating mb-3">

      <button
        className="btn btn-outline-info"
        onClick={handleLogin}
      >
        Login
      </button>
      </div>
      <div className="text-center mt-4">
          <h6>OR</h6>
          <p> Don't have an account? <Link to="/signup" className="text-primary">Signup</Link></p>
          </div>

    </form>

          </>
  );
};

export default Signin;
