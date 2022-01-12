import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import useUserInfo from "../../context/user";
import { fb } from "../../lib";
import { AVATAR_PIC } from "../../static";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [{ user }] = useUserInfo();

  useEffect(() => {
    if (user === null) {
      navigate("/", { replace: true });
      return;
    }

    if (user?.displayName !== params.username) {
      navigate("/", { replace: true });
      return;
    }

    const res = async () => {
      await fb.findUserProfile(params.username).then((temp) => {
        setData(temp);
      });
    };

    res();
    // eslint-disable-next-line
  }, [params.username, user]);

  return (
    <>
      <Helmet>
        <title>{params.username}'s Profile – Centralize</title>
      </Helmet>
      <div id="hero" className="py-10" style={{ background: "#F5CDAA" }}>
        <div className="container flex justify-between gap-6 items-center flex-wrap">
          <div className="flex gap-3 items-center">
            <img
              src={data?.photoURL ? data?.photoURL : AVATAR_PIC}
              alt={`${data?.username} avatar pic`}
              className="rounded-full w-20 h-20"
            />
            <div>
              <h1 className="font-bold text-3xl h-max">{data?.username}</h1>
              <p className="h-max">
                <span className="inline-block">{data?.name}</span>&emsp;•&emsp;
                <span className="inline-block">{data?.email}</span>&emsp;•&emsp;
                <span className="inline-block">
                  Date Joined:{" "}
                  {data?.dateJoined
                    ? data?.dateJoined.split(",")[0].replace(" ", "/")
                    : "Unavailable"}
                </span>
              </p>
            </div>
          </div>
          <Button role="btn" type="outlineGreen" onClick={() => {}}>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="container my-16">Hello.</div>
    </>
  );
};

export default Profile;
