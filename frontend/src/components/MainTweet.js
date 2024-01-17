import React, { useState } from "react";
import TimelineTweet from "./TimelineTweet";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
import axios from "axios";

const MainTweet = () => {
 
  const [tweet, setTweet] = useState({description: '',picture:null });
  const { currentUser } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData= new FormData();
    formData.append('userId',currentUser._id);
    formData.append('description',tweet.description);
    formData.append('picture',tweet.picture);
    try {
     await axios.post("/tweets", formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
      window.location.reload(false);
      toast.success("tweet post");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <div>
                  <img
              src={`http://localhost:8000/uploads/${currentUser.profileImage.split('\\')[1]}`}
              alt="Profile Picture"
              className="w-12 h-12 rounded-circle"
            />
        <p className="font-bold pl-2 my-2">{currentUser.name}</p>
        </div>
      )}

      <form className="border-b-2 pb-6" onSubmit={submitHandler}>
        <textarea
           value={tweet.description} onChange={(e) => setTweet({ ...tweet, description: e.target.value })}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded w-100 p-2"
        ></textarea>
         <input type='file' className='form-control mt-1 mb-3' 
         placeholder="image"
            onChange={(e)=>{setTweet({...tweet,picture:e.target.files[0]})}}/>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
          type='submit'>
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
