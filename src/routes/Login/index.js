import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login – Centralize</title>
      </Helmet>
      <div className="container my-20 flex gap-10 h-full relative items-center justify-center">
        <div className="p-7 bg-sky-200 border-gray-800 border-solid border max-w-md w-full">
          <h1 className="font-bold text-3xl mb-5">Welcome Back</h1>
          <label className="block mb-1" htmlFor="">
            Email Address
          </label>
          <input
            type="text"
            className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
          />
          <label className="block mb-1" htmlFor="">
            Password
          </label>
          <input
            type="password"
            className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-2"
          />
          <small className="block text-sm mb-5 underline text-right">
            Forgot Password?
          </small>
          <button className="py-3 px-8 font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 border-solid border border-blue-800 w-full">
            Continue
          </button>
          <small className="block text-sm mt-5 underline">
            <Link to="/register">Not a user yet? Register here.</Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default Login;
