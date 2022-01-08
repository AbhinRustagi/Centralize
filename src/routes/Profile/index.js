import React from "react";
// import useUserInfo from "../../context/user";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  // const [{ user }, dispatch] = useUserInfo();

  return (
    <div id="hero" className="bg-lime-200 py-10">
      <div className="container">
        <h1 className="font-bold text-3xl">{params.username}</h1>
      </div>
    </div>
  );
};

export default Profile;
