import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Img from "../../static/Accountant-bro (1).svg";
import { fb } from "../../utils";
import { showToast } from "../../components";
import useUserInfo from "../../context/user";

const Register = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [{ user }, dispatch] = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate(`/cp/${user?.displayName}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!fb.findIfUserNameExists(formInput.username)) {
      showToast("Username exists", "danger");
    }
  }, [formInput.username]);

  const validateUsername = (e) => {
    // eslint-disable-next-line
    const rx = /[A-Za-z0-9\._]+/g;
    if (!rx.test(e.key)) {
      e.preventDefault();
    }
  };

  const proceedToRegister = (e) => {
    e.preventDefault();

    fb.register(formInput).then((res) => {
      if (!res.success) {
        showToast(`There was an error: ${res.message}`, "danger");
        return;
      }

      showToast(
        `Registered successfully.\nWelcome, ${res.user.displayName}`,
        "success"
      );
      dispatch({ type: "SET_USER", user: { ...res.user } });
    });
  };

  return (
    <>
      <Helmet>
        <title>Register – Centralize</title>
      </Helmet>
      <div className="container flex-wrap py-20 flex gap-10 h-full relative items-center justify-center">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div
            className="p-8 text-neutral-900 bg-lime-200 rounded-3xl max-w-md w-full"
            style={{ background: "#D3E4CD" }}
          >
            <h1 className="font-bold text-3xl mb-5">Welcome to Centralize!</h1>
            <form>
              <label className="block mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    [e.target.name]: e.target.value,
                  })
                }
                name="name"
                value={formInput.name}
                placeholder="John Doe"
                className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              />
              <label className="block mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                onKeyDown={validateUsername}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    [e.target.name]: e.target.value,
                  })
                }
                name="username"
                value={formInput.username}
                placeholder="john.doe"
                className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              />
              <label className="block mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    [e.target.name]: e.target.value,
                  })
                }
                name="email"
                value={formInput.email}
                placeholder="john.doe@gmail.com"
                className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              />
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type="password"
                pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm"
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formInput.password}
                placeholder="this_is_crazy"
                className="w-full focus:rounded-none focus:outline-none text-base block border border-solid border-gray-800 py-2 px-3 mb-6"
              />
              <button
                onClick={proceedToRegister}
                className="py-3 rounded px-8 font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 border-solid border border-blue-800 w-full"
              >
                Continue
              </button>
            </form>
            <small className="block text-sm mt-5 underline">
              <Link to="/login">Already a user? Login here.</Link>
            </small>
          </div>
        </div>
        <img src={Img} alt="" className="w-full max-w-xl" />
      </div>
    </>
  );
};

export default Register;
