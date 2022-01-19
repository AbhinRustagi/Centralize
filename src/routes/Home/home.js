import { useEffect } from "react";
import Helmet from "react-helmet";
import { FaChartBar, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import useUserInfo from "../../context/user";
import { MdMoneyOff } from "react-icons/md";
import { LANDING_IMG } from "../../static";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useUserInfo();
  const { t } = useTranslation();

  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user?.username}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (!token) return;

    axios("http://localhost:8888/.netlify/functions/api/getUserFromToken", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data.user) {
        dispatch({ type: "SET_USER", user: res.data.user });
      }
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Helmet>
        <title>Centralize – Productivity Partner</title>
      </Helmet>
      <div className="lg:my-24 md:my-16 my-12">
        <div className="container">
          <div className="w-full min-w-300px">
            <h1 className="font-bold text-5xl lg:text-6xl md:text-center">
              {t("home.title.a")}{" "}
              <span className="text-blue-500">{t("home.title.b")}</span>.
            </h1>
            <p className="my-8 text-xl leading-loose md:text-center max-w-3xl font-medium md:mx-auto">
              {t("home.description")}
            </p>
            <Button jumbo href="/register" type="primary" _css="md:mx-auto">
              {t("home.registerBtn")}
            </Button>
            <p>
              <Link
                className="underline md:text-center block my-3 font-medium"
                to="/login"
              >
                {t("home.alreadyAUser")}
              </Link>
            </p>
          </div>
          <img
            src={LANDING_IMG}
            className="w-full block md:mx-auto max-w-xl my-12"
            alt="Person working vector"
          />
        </div>
      </div>
      <div className="mb-12 bg-gradient-to-b from-green-400 to-green-500 py-10 text-white">
        <div className="container flex justify-between items-center flex-wrap gap-16">
          <div className="flex-1 flex min-w-300px items-center flex-col">
            <span className="text-6xl font-bold block mb-2">
              <MdMoneyOff />
            </span>
            <span className="block font-medium">Free Forever!</span>
          </div>
          <div className="flex-1 flex min-w-300px items-center flex-col">
            <span className="text-6xl font-bold block mb-2">
              <FaChartBar />
            </span>
            <span className="block font-medium">Insightful Record Keeping</span>
          </div>
          <div className="flex-1 flex min-w-300px items-center flex-col">
            <span className="text-6xl font-bold block">
              <FaUserFriends />
            </span>
            <span className="block font-medium">User Friendly</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
