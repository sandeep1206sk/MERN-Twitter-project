import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import EditProfile from "../components/EditProfile";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../components/Tweet";

import { following } from "../redux/userSlice";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
       await axios.put(`/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
          await axios.put(`/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className=" justify-between items-center">
          <img
              src={`http://localhost:8000/uploads/${currentUser.profileImage.split('\\')[1]}`}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
          <p className="font-bold pl-2 my-2">{currentUser.name}</p>
          <h5 className="font-bold pl-2 my-2">{currentUser.email}</h5>
          <h5 className="font-bold pl-2 my-2">{currentUser.dateOfBirth}</h5>
          <h5 className="font-bold pl-2 my-2">{currentUser.location}</h5>

            {currentUser._id === id && currentUser.following.includes(id) ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
