import Button from "components/Button";
import Heading from "components/Common/Heading";
import { getUsernameFromToken, readTokens } from "lib/tokenFunctions";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaChartBar, FaUserFriends } from "react-icons/fa";
import { MdMoneyOff } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { LANDING_IMG } from "static";

const Home = () => {
  const { t } = useTranslation();

  if (readTokens().ok) {
    return <Navigate to={`/cp/${getUsernameFromToken()}`} />;
  }

  return (
    <>
      <Helmet>
        <title>Centralize – Productivity Partner</title>
      </Helmet>
      <div className="lg:my-24 md:my-16 my-12">
        <div className="container">
          <div className="w-full min-w-300px">
            <Heading.H1
              size="5xl"
              overrideCSS="lg:text-6xl md:text-center"
            >
              {t("home.title.a")}{" "}
              <span className="text-blue-500">{t("home.title.b")}</span>.
            </Heading.H1>
            <p className="my-8 text-xl leading-loose md:text-center max-w-3xl font-medium md:mx-auto">
              {t("home.description")}
            </p>
            <Button
              size="jumbo"
              role="anchor"
              anchorProps={{ href: "/register" }}
              variant="primary"
              overrideCSS="md:mx-auto"
            >
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
