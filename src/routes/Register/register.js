import Button from "components/Button";
import Heading from "components/Common/Heading";
import Toast from "components/Toast";
import Tooltip from "components/Tooltip";
import validateAll from "lib";
import { register } from "lib/axios";
import { getUsernameFromToken, readTokens } from "lib/tokenFunctions";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaInfoCircle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { REGISTER_ROUTE_IMG } from "static";

const Register = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    displayUrl: "",
  });
  const navigate = useNavigate();

  if (readTokens().ok) {
    return <Navigate to={`/cp/${getUsernameFromToken()}`} />;
  }

  const proceedToRegister = async (e) => {
    e.preventDefault();

    const validationResult = validateAll(formInput);

    if (!validationResult.success) {
      validationResult.message.forEach((text) => {
        Toast(text, "danger");
      });
      return;
    }

    await register(formInput).then((res) => {
      console.log(res);
      if (!res.ok) {
        Toast(res.message, "danger");
        return;
      }

      navigate(`/cp/${getUsernameFromToken()}`);
    });
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Register – Centralize</title>
      </Helmet>
      <div className="container flex-wrap py-20 flex gap-10 h-full relative items-center justify-center">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="p-8 rounded-3xl max-w-md w-full bg-white shadow-md">
            <Heading.H1 size="3xl" overrideCSS="mb-5">
              Get Started
            </Heading.H1>
            <form>
              <label className="block mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                required
                onChange={handleChange}
                name="name"
                value={formInput.name}
                placeholder="John Doe"
                className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              />
              <label className="block mb-1" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  onChange={handleChange}
                  name="username"
                  value={formInput.username}
                  placeholder="john.doe"
                  className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
                />
                <div className="absolute top-3 right-3">
                  <Tooltip text="Must only contain alphanumeric characters, underscores (_) or stops(.)">
                    <FaInfoCircle />
                  </Tooltip>
                </div>
              </div>
              <label className="block mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={formInput.email}
                placeholder="john.doe@gmail.com"
                className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              />
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm"
                  onChange={handleChange}
                  value={formInput.password}
                  placeholder="this_is_crazy"
                  className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-6"
                />
                <div className="absolute top-3 right-3">
                  <Tooltip text="Must contain one uppercase letter, one lowercase letter, one digit and one special character. (Minimum length: 8 characters)">
                    <FaInfoCircle />
                  </Tooltip>
                </div>
              </div>
              <label className="block mb-1" htmlFor="photoUrl">
                Display Picture URL
              </label>
              <input
                name="displayUrl"
                type="url"
                pattern="(https?:\/\/.*\.(?:png|jpg))"
                onChange={handleChange}
                value={formInput.displayUrl}
                placeholder="(PNG or JPG)"
                className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-6"
              />
              <Button width="full" onClick={proceedToRegister}>
                Continue
              </Button>
            </form>
            <small className="block text-sm mt-5 underline">
              <Link to="/login">Already a user? Login here.</Link>
            </small>
          </div>
        </div>
        <img
          src={REGISTER_ROUTE_IMG}
          alt="Person working from home - vector"
          className="w-full max-w-xl"
        />
      </div>
    </>
  );
};

export default Register;
