import { useEffect } from "react";
import HeroImg from "../../static/Working from anywhere-bro.svg";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import useUserInfo from "../../context/user";

const Home = () => {
  const navigate = useNavigate();
  const [{ user }] = useUserInfo();

  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user?.displayName}`, { replace: true });
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Centralize – Productivity Partner</title>
      </Helmet>
      <div
        className="pt-12 text-neutral-900 bg-sky-200  border-b border-b-gray-800"
        style={{ background: "#B5EAEA" }}
      >
        <div className="container flex items-center flex-wrap lg:flex-nowrap gap-10">
          <div className="w-full min-w-300px">
            <h1 className="font-medium text-4xl lg:text-5xl mb-3">
              Feel free to be productive anywhere.
            </h1>
            <p className="my-5 leading-loose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              nisi aliquid perspiciatis, quibusdam aspernatur praesentium. Quia
              molestiae similique recusandae quas soluta totam ullam asperiores
              suscipit nisi, minus minima dignissimos reiciendis?
            </p>
            <Link
              to="/register"
              className="block w-max py-3 px-8 font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 rounded border-solid border border-blue-800"
            >
              Get Started
            </Link>
          </div>
          <div className="w-full min-w-300px">
            <img src={HeroImg} className="w-full block" alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
