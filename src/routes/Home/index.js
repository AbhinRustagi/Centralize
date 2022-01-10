import HeroImg from "../../static/Working from anywhere-bro.svg";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Centralize – Productivity Partner</title>
      </Helmet>
      <div className="pt-12 text-neutral-900 bg-sky-200  border-b border-b-gray-800">
        <div className="container flex items-center flex-wrap lg:flex-nowrap gap-10">
          <div className="w-full min-w-300px">
            <h1 className="leading-relaxed font-medium md:text-3xl text-3xl  lg:text-5xl mb-3">
              Your Productivity Partner
            </h1>
            <p className="my-5 leading-loose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              nisi aliquid perspiciatis, quibusdam aspernatur praesentium. Quia
              molestiae similique recusandae quas soluta totam ullam asperiores
              suscipit nisi, minus minima dignissimos reiciendis?
            </p>
            <Link
              to="/register"
              className="block w-max py-3 px-8 font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 border-solid border border-blue-800"
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
