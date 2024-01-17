import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainTweet from "../components/MainTweet";
import Signin from "./Signin";
import Navbar from '../components/Navbar'

import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container">
      {!currentUser ? (
        <Signin />
      ) : (
        <div>
           <Navbar />
        <div className="row mt-0">
          <div className="col-md-3  ">
          <LeftSidebar />
          </div>
          <div className="col-md-6  border-secondary border-end border-start ">
          <MainTweet />
          </div>
          <div className="col-md-3">
        
          </div>
        </div>
        </div>

      )}
    </div>
  );
};

export default Home;
