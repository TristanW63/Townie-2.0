import React, { useState, useEffect } from "react";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { BsPersonPlusFill } from "react-icons/bs";

const AddFriend = ({ username, currentUser, myId }) => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [getUser, { loading, data, error }] = useLazyQuery(QUERY_USER, {
    variables: { username: username },
  });
  const [isFriend, setIsFriend] = useState(false);
  const friendID = data?.user?._id;
  const friend2 = currentUser;
  console.log(friend2);

  const handleAddFriendClick = async () => {
    await getUser();
  };

  useEffect(() => {
    const handleClick = async () => {
      const alreadyFriends = friend2.some((friend) => friend._id === friendID);
      if (alreadyFriends) {
        console.log("friend already added");
        setIsFriend(true);
        return;
      }
      try {
        const { data } = await addFriend({
          variables: {
            userId: friendID,
          },
        });
        console.log(data);
        console.log("friend added");
        setIsFriend(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (friendID) {
      handleClick();
    }
  }, [friendID]);

  useEffect(() => {
    if (currentUser && Array.isArray(currentUser)) {
      const friendIds = currentUser.map((friend) => friend._id);
      if (friendIds.includes(friendID)) {
        setIsFriend(true);
      }
    }
    localStorage.setItem(`isFriend-${friendID}`, isFriend);
  }, [isFriend, friendID, currentUser]);
  

  useEffect(() => {
    const savedIsFriend = localStorage.getItem(`isFriend-${friendID}`);
    if (savedIsFriend) {
      setIsFriend(JSON.parse(savedIsFriend));
    }
  
    return () => {
      setIsFriend(false);
      localStorage.removeItem(`isFriend-${friendID}`);
    };
  }, []);
  

  return (
    <>
      <p>
        {username}{" "}
        {Array.isArray(currentUser) &&
          !isFriend && (
            <BsPersonPlusFill onClick={() => handleAddFriendClick()} />
          )}
      </p>
    </>
  );
};

export default AddFriend;
