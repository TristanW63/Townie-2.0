import React, { useState, useEffect, createContext } from "react";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const IdContext = createContext();

const AddFriend = ({ username, myId }) => {
  const [getUser, { loading, data, error }] = useLazyQuery(QUERY_USER, {
    variables: { username: username },
    onCompleted: ({ user }) => {
      const userId = user._id;
      setUserId(userId);
      if(myId !== userId) {
      navigate({
        pathname: `/UserProfile`,
      });
    } else {
      navigate({
        pathname: `/Profile`,
      });
    }
    },
  });

  const navigate = useNavigate();
  const { setUserId } = useContext(IdContext);

  const handleAddFriendClick = () => {
    getUser();
  };
  
  return (
    <>
      <p onClick={handleAddFriendClick}>
        {username}
      </p>
    </>
  );
};


export default AddFriend;

