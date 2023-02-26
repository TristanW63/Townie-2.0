import React, { useState, useEffect } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";
import { BsPersonPlusFill } from "react-icons/bs";
// import { useParams } from "react-router-dom";

const AddFriend = ({ username }) => {
    console.log(username)
    const [getUser, { loading, data, error }] = useLazyQuery(QUERY_USER);
    const handleClick = () => {
    try{
            getUser({
              variables: { username }
            });
          
    }
    catch(err) {
        console.log(err)
    }
}
  
    return (
      <>
        <p>
          {username} <BsPersonPlusFill onClick={handleClick} />
        </p>
      </>
    );
  };
  
  export default AddFriend;
  