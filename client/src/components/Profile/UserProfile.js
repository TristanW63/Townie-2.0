import React, { useState, useContext, useEffect } from "react";
import "../Home/Home.css";
import NavBar from "./../Navbar/Navbar";
import { IdContext } from "../Friends/AddFriend";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERPROFILE, QUERY_USER } from "../../utils/queries";
import { NavLink, Modal, Button } from "react-bootstrap";
import { ADD_FRIEND } from "../../utils/mutations";
import PostsList from "../Posts/Posts";
import { MdAdd } from "react-icons/md";
import Auth from "../../utils/auth";

const UserProfile = () => {
  const { userId } = useContext(IdContext);
  const [showModal2, setShowModal2] = useState(false);
 const { data, loading, error } = useQuery(QUERY_USERPROFILE, {
    variables: { userId: userId },
  });
  const [addedFriend, setAddedFriend] = useState("");
  const posts = data?.friendProfile?.posted || [];
  const user = data?.friendProfile || {};
  const currentUsername = Auth.getProfile().data.username;
  const { data: data2 } = useQuery(QUERY_USER, {
    variables: { username: currentUsername },
  });
  const currentUser = data2?.user || {};
  const [addFriend] = useMutation(ADD_FRIEND);

  const handleAddFriend = async () => {
    const alreadyFriends = currentUser.friends?.some(
      (friend) => friend._id === user._id
    );
    if (user._id === currentUser._id) {
      console.log("cannot add yourself as a friend");
    } else if(alreadyFriends) {
      console.log("already friends");
    } else {
      const { data } = await addFriend({
        variables: { userId: userId },
      });
      console.log(data);
      setAddedFriend(true);
      localStorage.setItem(`addedFriend${userId}`, true);
    }
  };

  useEffect(() => {
    const addedFriend = localStorage.getItem(`addedFriend${userId}`);
    if (addedFriend) {
      setAddedFriend(true);
    }
  }, []);

  return (
    <>
    <div className="Home">
      <NavBar />
      <div className="postCard">
      <div className="profiledelete" id="profiledelete">
        {user._id === currentUser._id ? (
                    <>
                    
                    </>
        ) : (
          <p className="deleteusers" style={{ display: addedFriend ? "none" : "inline" }}>
                      {" "}
                      Add Friend{" "}
                      <MdAdd
                        className="addfriend"
                        onClick={() => {
                          handleAddFriend();
                        }}
                      />
                    </p>
        )}
            <p className="friendCount" onClick={() => {setShowModal2(true);}}>
              Friends: {user.friendCount}
              </p>
          </div>
      <PostsList
            posts={posts}
            showTitle={false}
            showUsername={false}
            // refetch={refetch}
          />
      </div>
    </div>
          </>
  );
};

export default UserProfile;
