import React, { useState } from "react";
import "../Home/Home.css";
import NavBar from "./../Navbar/Navbar";
import { useContext } from "react";
// import { FriendContext } from "../Friends/AddFriend";

const UserProfile = () => {
    // const userId = useContext(FriendContext);

//   console.log(userId);

  return (
    <div className="Home">
      <NavBar />
      <div>
        {/* <h1>{userId}</h1> */}
      </div>
    </div>
  );
};

export default UserProfile;
