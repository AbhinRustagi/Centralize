import Button from "components/Button";
import Heading from "components/Common/Heading";
import Toast from "components/Toast";
import Tooltip from "components/Tooltip";
import { validateEmail } from "lib";
import { logIn } from "lib/axios";
import { getUsernameFromToken, readTokens } from "lib/tokenFunctions";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { FaInfoCircle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE_IMG } from "static";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  if (readTokens().ok) {
    return <Navigate to={`/cp/${getUsernameFromToken()}`} />;
  }

  const validate = ({ email, password }) => {
    let res1 = validateEmail(email);

    return res1.success
      ? { success: true }
      : { success: false, message: "Invalid Email Format" };
  };

  const proceedToLogIn = async (e) => {
    e.preventDefault();

    const res = validate(input);
    if (!res.success) {
      Toast(res.message, "danger");
      return;
    }

    await logIn(input.email, input.password).then((res) => {
      if (!res.ok) {
        Toast("There was an error", "danger");
        return;
      }

      navigate(`/cp/${getUsernameFromToken()}`, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>Login – Centralize</title>
      </Helmet>
      <div className="container py-20 flex gap-10 flex-wrap h-full relative items-center justify-center">
        <div className="p-8 rounded-3xl shadow-md bg-white max-w-md w-full">
          <Heading.H1 size="3xl" overrideCSS="mb-5">
            Welcome Back
          </Heading.H1>
          <form>
            <label className="block mb-1" htmlFor="email">
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
              placeholder="john.doe@gmail.com"
            />
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={input.password}
                name="password"
                placeholder="this_is_crazy"
                onChange={(e) => {
                  setInput({ ...input, [e.target.name]: e.target.value });
                }}
                className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-2"
              />
              <div className="absolute top-3 right-3">
                <Tooltip text="Must contain one uppercase letter, one lowercase letter, one digit and one special character. (Minimum length: 8 characters)">
                  <FaInfoCircle />
                </Tooltip>
              </div>
            </div>
            <small className="block text-sm mb-5 underline text-right">
              <Link to="/reset-password">Forgot Password?</Link>
            </small>
            <Button variant="primary" width="full" onClick={proceedToLogIn}>
              Continue
            </Button>
          </form>
          <small className="block text-sm mt-5 underline">
            <Link to="/register">Not a user yet? Register here.</Link>
          </small>
        </div>
        <img
          src={LOGIN_ROUTE_IMG}
          alt="Person meditating vector"
          className="max-w-xl w-full"
        />
      </div>
    </>
  );
};

export default Login;
