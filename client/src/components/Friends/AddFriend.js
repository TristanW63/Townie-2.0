import React, { useState, useEffect, createContext } from "react";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const AddFriend = ({ username }) => {
  const [getUser, { loading, data, error }] = useLazyQuery(QUERY_USER, {
    variables: { username: username },
  });

  const navigate = useNavigate();

  const userId = data?.user?._id;

  const handleAddFriendClick = async () => {
    await getUser();
    // setUser(data?.user?._id);
    navigate({
      pathname: `/UserProfile/${userId}`,
      state: { userId: userId },
    });
  };
  
  return (
    <>
      <p onClick={handleAddFriendClick}>
        {username}{" "}
        </p>
    </>
  );
};

export default AddFriend;
