import HeroImg from "../../static/hero.jpg";

const Home = () => {
  return (
    <div className="min-h-80vh py-12 bg-lime-200 border-b border-b-gray-800">
      <div className="container flex gap-10">
        <div className="flex-1">
          <h1 className="leading-relaxed font-light text-5xl mb-3">
            Your Productivity Partner
          </h1>
          <button className="py-3 px-8 font-medium text-base bg-teal-700 text-white hover:bg-teal-700/30 hover:text-teal-700 border-solid border border-teal-700 rounded">
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img src={HeroImg} className="w-full" alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Home;
