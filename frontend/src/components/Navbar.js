import React, { useState } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "./UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 text-center">
          <i className="fa-brands fa-twitter fs-1"  style={{color: "#52c5ff",}} ></i>
          </div>
          <div className="col-md-6">
          <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
          <StarBorderPurple500Icon />
        </div>
          </div>
          <div className="col-md-3">
          <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
      </div>

          </div>
        </div>
      </div>
  );
};

export default Navbar;
