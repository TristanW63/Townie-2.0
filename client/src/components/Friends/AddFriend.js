import React, { useState, useEffect } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { BsPersonPlusFill } from "react-icons/bs";
// import { useParams } from "react-router-dom";

const AddFriend = ({ username }) => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [getUser, { loading, data, error }] = useLazyQuery(QUERY_USER,
    { variables: { username: username } }
  );

  const friend = data?.user._id;

  console.log(friend);
  const handleAddFriendClick = () => {
    getUser();
    handleClick();
  };

  const handleClick = async () => {
    try {
      const { data } = await addFriend({
        variables: {
          userId: friend,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p>
      {username} <BsPersonPlusFill onClick={() => {handleAddFriendClick();}} />
      </p>
    </>
  );
};

export default AddFriend;

  