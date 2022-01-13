import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import {
  FaChartPie,
  FaEdit,
  FaTrash,
  FaUserAlt,
  FaUserCog,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button, showToast } from "../../components";
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
        if (temp.success) setData(temp.data);
        else {
          showToast(
            `There was an error fetching data: ${temp.message}`,
            "danger"
          );
        }
      });
    };

    if (user.uid) res();
    // eslint-disable-next-line
  }, [params.username, user]);

  const proceedToVerifyEmail = (e) => {
    e.preventDefault();
    fb.sendAccountVerificationEMail().then((res) => {
      if (res.success) {
        showToast("Email Sent", "success");
      } else {
        showToast("There was an error: " + res.message, "danger");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>{params.username}'s Profile – Centralize</title>
      </Helmet>
      {!user?.emailVerified && (
        <div className="bg-yellow-200 py-3">
          <div className="container flex gap-4 flex-wrap items-center justify-between">
            Your email address is unverified.{" "}
            <Button role="btn" type="outline" onClick={proceedToVerifyEmail}>
              Send Verification Email
            </Button>
          </div>
        </div>
      )}
      <div
        id="hero"
        className="py-10 text-white"
        style={{ background: "#435560" }}
      >
        <div className="container flex justify-between items-center gap-6 flex-wrap">
          <div className="flex gap-3">
            <img
              src={data?.photoUrl ? data?.photoUrl : AVATAR_PIC}
              alt={`${data?.username} avatar pic`}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <h1 className="font-bold text-3xl h-max mb-2">
                Hi, {data?.username}
              </h1>
              <p className="h-max flex items-center gap-2 flex-wrap">
                <span className="inline-block">{data?.name}</span>•
                <span className="inline-block">{data?.email}</span>•
                <span className="inline-block">
                  Date Joined:{" "}
                  {data?.dateJoined
                    ? data?.dateJoined.split(",")[0].replace(" ", "/")
                    : "Unavailable"}
                </span>
              </p>
            </div>
          </div>
          <Button role="btn" sm type="outlineWhite" onClick={() => {}}>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="container my-12">
        <div className="mb-10 flex items-center gap-4 flex-wrap">
          <Button href="." type="outline" sm>
            <FaUserAlt /> Sets
          </Button>
          <Button href="." type="outlineGreen" sm>
            <FaChartPie /> Record
          </Button>
          <Button href="." type="outlineGray" sm>
            <FaUserCog /> Profile Settings
          </Button>
        </div>
        <h2 className="text-3xl font-bold">Sets</h2>
        <div className="flex gap-4 items-center my-4">
          <div className="p-5 rounded bg-violet-100">
            <h3 className="font-medium text-lg mb-3">Set Name</h3>
            <div className="flex gap-3 items-center">
              <Button href="." type="outlineRed" sm>
                <FaTrash />
                Delete
              </Button>
              <Button href="." type="outline" sm>
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
