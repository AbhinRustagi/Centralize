import Button from "components/Button";
import Heading from "components/Common/Heading";
import { getUserDetails } from "lib/axios";
import { readTokens } from "lib/tokenFunctions";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import {
  FaChartPie,
  FaEdit,
  FaTrash,
  FaUserAlt,
  FaUserCog,
} from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";
import { AVATAR_PIC } from "static";

const Profile = () => {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getUserDetails(readTokens() || params.username).then((res) => {
      setData(res);
    });
    //  eslint-disable-next-line
  }, []);

  if (!readTokens().ok) {
    return <Navigate to="/" />;
  }

  // const proceedToVerifyEmail = (e) => {
  //   e.preventDefault();
  //   fb.sendAccountVerificationEMail().then((res) => {
  //     if (res.success) {
  //       Toast("Email Sent", "success");
  //     } else {
  //       Toast("There was an error: " + res.message, "danger");
  //     }
  //   });
  // };

  return (
    <>
      <Helmet>
        <title>{params.username}'s Profile – Centralize</title>
      </Helmet>
      {/* {!user?.emailVerified && (
        <div className="bg-yellow-200 py-3">
          <div className="container flex gap-4 flex-wrap items-center justify-between">
            Your email address is unverified.{" "}
            <Button role="btn" type="outline" onClick={proceedToVerifyEmail}>
              Send Verification Email
            </Button>
          </div>
        </div>
      )} */}
      <div className="container">
        <div className="flex justify-between items-center gap-6 flex-wrap my-8 bg-white rounded-3xl p-4 shadow">
          <div className="flex lg:gap-12 gap-4 items-center flex-wrap">
            <div className="flex items-center gap-5">
              <img
                src={data?.displayUrl ? data?.displayUrl : AVATAR_PIC}
                alt={`${data?.username} avatar pic`}
                className="rounded-full w-16 h-16 object-cover"
              />
              <div className="flex justify-center flex-col">
                <p className="font-bold text-xl h-max">{data?.name}</p>
                <p className="text-gray-500">{data?.username}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Email</p>
              <p className="font-medium">{data?.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Date Joined</p>
              <p className="font-medium">
                {data?.dateJoined
                  ? data?.dateJoined.split(",")[0].replace(" ", "/")
                  : "Unavailable"}
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => {}}>
            <FaEdit />
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="container my-12">
        <div className="mb-10 flex items-center gap-4 flex-wrap">
          <Button role="anchor" anchorProps={{ href: "." }} size="sm">
            <FaUserAlt /> Sets
          </Button>
          <Button
            role="anchor"
            anchorProps={{ href: "." }}
            type="green"
            size="sm"
          >
            <FaChartPie /> Record
          </Button>
          <Button
            role="anchor"
            anchorProps={{ href: "." }}
            type="primaryGray"
            size="sm"
          >
            <FaUserCog /> Profile Settings
          </Button>
        </div>
        <Heading.H2 size="3xl">Sets</Heading.H2>
        <div className="flex gap-4 items-center my-4">
          <div className="p-5 rounded bg-violet-100">
            <Heading.H3 w8t="medium" size="lg" overrideCSS="mb-3">
              Set Name
            </Heading.H3>
            <div className="flex gap-3 items-center">
              <Button
                role="anchor"
                anchorProps={{ href: "." }}
                type="outlineRed"
                size="sm"
              >
                <FaTrash />
                Delete
              </Button>
              <Button
                role="anchor"
                anchorProps={{ href: "." }}
                type="outline"
                size="sm"
              >
                <FaEdit />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
