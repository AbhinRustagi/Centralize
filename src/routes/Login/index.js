import React from "react";

const Login = () => {
  return (
    <div className="container my-20 flex gap-10 h-full relative items-center justify-center">
      <div className="p-7 bg-lime-200 border-gray-800 border-solid border max-w-md w-full">
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
        <button className="py-3 px-8 font-medium text-base bg-teal-700 text-white hover:bg-teal-700/30 hover:text-teal-700 border-solid border border-teal-700 w-full">
          Continue
        </button>
        <small className="block text-sm mt-5 underline">
          Not a user yet? Register here.
        </small>
      </div>
    </div>
  );
};

export default Login;
