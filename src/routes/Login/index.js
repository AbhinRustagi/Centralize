import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { showToast } from "../../components";
import useUserInfo from "../../context/user";
import Img from "../../static/Meditation-bro.svg";
import { fb } from "../../utils";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [{ user }, dispatch] = useUserInfo();

  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user.displayName}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  const proceedToLogIn = async (e) => {
    e.preventDefault();

    await fb.signIn("rustagi.abhin@gmail.com", "hello123").then((res) => {
      console.log(res);
      if (!res.success) {
        showToast("There was an error", "danger");
        return;
      }
      dispatch({ type: "SET_USER", user: res.user });
    });
  };

  return (
    <>
      <Helmet>
        <title>Login – Centralize</title>
      </Helmet>
      <div className="container py-20 flex gap-10 flex-wrap h-full relative items-center justify-center">
        <div
          className="p-8 rounded-3xl text-neutral-900 bg-sky-200 max-w-md w-full"
          style={{ background: "#F6EABE" }}
        >
          <h1 className="font-bold text-3xl mb-5">Welcome Back</h1>
          <form>
            <label className="block mb-1" htmlFor="">
              Email Address
            </label>
            <input
              value={input.email}
              name="email"
              onChange={(e) => {
                setInput({ ...input, [e.target.name]: e.target.value });
              }}
              type="email"
              className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
            />
            <label className="block mb-1" htmlFor="">
              Password
            </label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={(e) => {
                setInput({ ...input, [e.target.name]: e.target.value });
              }}
              className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-2"
            />
            <small className="block text-sm mb-5 underline text-right">
              Forgot Password?
            </small>
            <button
              onClick={proceedToLogIn}
              className="py-3 px-8 rounded font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 border-solid border border-blue-800 w-full"
            >
              Continue
            </button>
          </form>
          <small className="block text-sm mt-5 underline">
            <Link to="/register">Not a user yet? Register here.</Link>
          </small>
        </div>
        <img src={Img} alt="" className="max-w-xl w-full" />
      </div>
    </>
  );
};

export default Login;
