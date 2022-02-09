import { Button, Toast } from "components";
import Heading from "components/Common/Heading";
import { fb, vl } from "lib";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const proceedToSendLink = async (e) => {
    e.preventDefault();

    if (!vl.validateEmail(input).success) {
      Toast("Invalid Email Format", "danger");
      return;
    }

    await fb.sendResetPasswordLink(input).then((res) => {
      if (res.success) {
        Toast("Password Reset Link sent", "success");
        navigate("/login");
        return;
      }
      Toast(`There was an error: ${res.message}.`, "danger");
      return;
    });
  };

  return (
    <>
      <Helmet>
        <title>Reset Password – Centralize</title>
      </Helmet>
      <div className="container py-20 flex gap-10 flex-wrap h-full relative items-center justify-center">
        <div className="p-8 rounded-3xl bg-white shadow-md max-w-md w-full">
          <Heading.H1 size="3xl" overrideCSS="mb-5">
            Reset Password
          </Heading.H1>
          <form>
            <label className="block mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              value={input.email}
              name="email"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="email"
              className="w-full text-base focus:rounded-none focus:outline-none block border border-solid border-gray-800 py-2 px-3 mb-5"
              placeholder="john.doe@gmail.com"
            />
            <Button variant="primary" width="full" onClick={proceedToSendLink}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
