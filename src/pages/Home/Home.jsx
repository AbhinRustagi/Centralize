import React from "react";
import "./Home.scss";
import {
  FaGoogle,
  FaBan,
  FaReact,
  FaMoneyBill,
  FaUserLock,
} from "react-icons/fa";
import { SiFirebase } from "react-icons/si";
import { Button } from "../../components";
import ArrowElement1 from "../../media/img/arrow-element.svg";
import LandingImg from "../../media/img/landing.svg";
import LandingImg2 from "../../media/img/landing2.svg";
import {
  browserPopupRedirectResolver,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useHistory } from "react-router-dom";

const Home = () => {
  const signIn = async () => {
    await signInWithRedirect(
      auth,
      provider,
      browserPopupRedirectResolver
    ).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <section id="hero">
        <div className="hero-img">
          <img src={LandingImg} alt="" />
        </div>
        <div className="hero-text">
          <h1>Productivity Partner for your everyday life.</h1>
          <p className="lg">Manage time. Stress less. Do more.</p>
          <div className="home-signup-btn-holder">
            <Button onClick={signIn} btnType="light">
              <FaGoogle />
              Sign Up with Google
            </Button>
            <img src={ArrowElement1} alt="Background Arrow Element" />
          </div>
        </div>
      </section>
      <section id="features">
        <div className="features-text">
          <h2>We keep our promises.</h2>
          <ul>
            <li>
              <FaBan /> No Ads.
            </li>
            <li>
              <FaMoneyBill /> Completely Free.
            </li>
            <li>
              <FaUserLock /> Data Privacy.
            </li>
          </ul>
        </div>
        <div className="features-img">
          <img src={LandingImg2} alt="" />
        </div>
      </section>
      <section id="technologies">
        <h3>
          Built on awesome technologies. <FaReact />
          <SiFirebase />
        </h3>
      </section>
    </>
  );
};

export default Home;
