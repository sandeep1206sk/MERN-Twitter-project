import React from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';

import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);


  const handleLogout = () => {
   
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
          <>
        <div className='text-center mt-1 fs-4 text-decoration-none list '>
       
          <div><Link to="/" className='text-decoration-none'><i className="fa-solid fa-house me-3 mt-4 "></i>Home</Link></div>
          <div><Link to="/explore" className='text-decoration-none'><i className="fa-solid  me-3 mt-4 ">#</i>Explore</Link></div>
          <div><Link to={`/profile/${currentUser._id}`} className='text-decoration-none'><i className="fa-solid fa-user me-3 mt-4 "></i>Profile</Link></div>
          <div><Link to="/signin" className='text-decoration-none'  onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-3 mt-4 "></i>Logout</Link></div>
          <div className="flex align-items-center " style={{marginTop:"19rem"}}>
    
        <img
              src={`http://localhost:8000/uploads/${currentUser.profileImage.split('\\')[1]}`}
              alt="pic"
              className="w-12 h-12 rounded-circle ms-4"
            />
      <p className="font-bold ms-2 ">{currentUser.name}</p>

       </div>
        </div>
      
    </>
 

  );
};

export default LeftSidebar;
