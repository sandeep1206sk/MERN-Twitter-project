import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex mt-2 pt-2 border-top ">
            <Link to={`/profile/${userData._id}`} className="flex space-x-2">
              <img
                src={`http://localhost:8000/uploads/${
                  userData.profileImage.split("\\")[1]
                }`}
                alt="pic"
                className="w-12 h-12 rounded-full"
              />
              <span className="font-bold my-2">{userData.name}</span>
            </Link>
            <p className=" my-2"> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <img
            src={`http://localhost:8000/uploads/${
              tweet.picture.split("\\")[1]
            }`}
            height="200"
            alt={tweet.name}
          />
          <div className="border-bottom border-danger  p-2">
            <button onClick={handleLike} className=" me-5">
              {tweet.likes.includes(currentUser._id) ? (
                <i
                  className="fa-solid fa-heart me-2"
                  style={{ color: "#ff0000" }}
                ></i>
              ) : (
                <i className="fa-regular fa-heart me-2"></i>
              )}
              {tweet.likes.length}
            </button>

            <button
              type="button"
              className="ms-5 me-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {" "}
              <i className="fa-regular fa-comment "></i>
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control border border-black "
                        aria-label="Sizing example input"
                        placeholder="Enter your comment"
                        aria-describedby="inputGroup-sizing-lg"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary text-black ms-5 me-5"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary text-black"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="ms-5 me-5">
              <i className="fa-solid fa-retweet"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
