// import React, { useState } from "react";
// import { QUERY_USER } from "../../utils/queries";
// import { useQuery } from "@apollo/client";
// // import { useParams } from "react-router-dom";

//  const UserName = ({ username }) => {
//     // const { username: userParam } = useParams();
//     const [userSearch, setUserSearch] = useState("");

// const handleClick = (e) => {
//     e.preventDefault();
// }

// const { data, loading, error } = useQuery(QUERY_USER, {
//     variables: { username: username },
//   });
//   const user = data?.user || {};
// console.log(user)


//   return (
//     <>
//     <p onClick={handleClick}>{username}</p>
//     </>
//   );
// };

// export default UserName;