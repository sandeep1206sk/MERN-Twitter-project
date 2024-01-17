import React from "react";
import ExploreTweets from "../components/ExploreTweets";
import LeftSidebar from "../components/LeftSidebar";

import { useSelector } from "react-redux";
import Signin from "./Signin";
import Navbar from "../components/Navbar";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
      <div>  <Navbar/>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <ExploreTweets />
          </div>
          <div className="px-6">
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Explore;
