import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>Please log in</div>;
  }
  return <div>Hi user: {user.username}</div>;
}

export default Profile;
