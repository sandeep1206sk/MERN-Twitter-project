import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";

import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [userDetails, setUserDetails] = useState({name:'', username:'', email:'', password:'', profileImage:null, location:'',dateOfBirth:''});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const formData= new FormData();
    formData.append('name',userDetails.name);
    formData.append('username',userDetails.username);
    formData.append('email',userDetails.email);
    formData.append('profileImage',userDetails.profileImage);
    formData.append('location',userDetails.location);
    formData.append('dateOfBirth',userDetails.dateOfBirth);
    formData.append('password',userDetails.password);
    console.log(userDetails)
try {
      const res = await axios.post("/auth/signup",formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
   
      });
      
      console.log(res)
      dispatch(loginSuccess(res.data));
      toast.success("signup success full");
      navigate("/signout");
    } catch (err) {
        console.log(err);
        toast.error("All fields require");
      dispatch(loginFailed());
    }
  };

  return (
    <>
    <form className="w-50 m-auto mt-5 border border-2 border-info-subtle p-5 rounded-4 shadow-lg" onSubmit={submitHandler}>
    <div className='text-center mb-3'>
        <i className="fa-brands fa-twitter fs-1"  style={{color: "#52c5ff",}} ></i>

            </div>
      <h2 className="text-center mb-5 fs-3 fw-bold">Sign up to Twitter</h2>
      <div className="form-floating mb-3 border border-info rounded">
      <input
          value={userDetails.name}
        onChange={(e) => setUserDetails({...userDetails,name:e.target.value})}
        type="text"
        placeholder="name"
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">name</label>
      </div>

      <div className="form-floating mb-3 border border-info rounded">
      <input
        value={userDetails.username}
        onChange={(e) => setUserDetails({...userDetails,username:e.target.value})}
        type="text"
        placeholder="username"
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">username</label>
      </div>

      <div className="form-floating mb-3 border border-info rounded">
      <input
        value={userDetails.email}
        onChange={(e) => setUserDetails({...userDetails,email:e.target.value})}
        type="email"
        placeholder="email"
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">Email</label>
      </div>

        <div className="form-floating mb-3 border border-info rounded">
       <input
        onChange={(e)=>{setUserDetails({...userDetails,profileImage:e.target.files[0]})}}
        type='file'
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">Profile Image</label>
      </div>

      <div className="form-floating mb-3 border border-info rounded">
      <input
        value={userDetails.location}
        onChange={(e) => setUserDetails({...userDetails,location:e.target.value})}
        type="text"
        placeholder="location"
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">loaction</label>
      </div>

      <div className="form-floating mb-3 border border-info rounded">
      <input
        value={userDetails.dateOfBirth}
        onChange={(e) => setUserDetails({...userDetails,dateOfBirth:e.target.value})}
        type="date"
        id="floatingInput"
        className="form-control"
      />
      <label for="floatingInput">Date Of Birth</label>
      </div>

      <div className="form-floating mb-3 border border-info rounded">
        <input
        value={userDetails.password}
        onChange={(e) => setUserDetails({...userDetails,password:e.target.value})}
        type="password"
        id="floatingPassword"
        placeholder="password"
        className="form-control"
      />
      <label for="floatingPassword">Password</label>
       </div>
      <button
        className="btn btn-outline-info"
        type="submit"
      >
        Sign up
      </button>
      <div className="text-center mt-4">
            <h6>OR</h6>
            <p> Already have an account? <Link to="/signout" className="text-primary">Login</Link></p>
        </div>
    </form>


</>
  );
};

export default Signup;
