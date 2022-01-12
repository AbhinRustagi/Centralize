import React, { useState } from "react";
import Helmet from "react-helmet";
import { fb } from "../../lib";
import { Button, showToast } from "../../components";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const proceedToSendLink = async (e) => {
    e.preventDefault();

    await fb.sendResetPasswordLink(input).then((res) => {
      if (res.success) {
        showToast("Password Reset Link sent", "success");
        navigate("/login");
        return;
      }
      showToast(`There was an error: ${res.message}.`, "danger");
      return;
    });
  };

  return (
    <>
      <Helmet>
        <title>Reset Password – Centralize</title>
      </Helmet>
      <div className="container py-20 flex gap-10 flex-wrap h-full relative items-center justify-center">
        <div
          className="p-8 rounded-3xl text-neutral-900 bg-sky-200 max-w-md w-full"
          style={{ background: "#D3DEDC" }}
        >
          <h1 className="font-bold text-3xl mb-5">Reset Password</h1>
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
            <Button role="btn" type="primary" wFull onClick={proceedToSendLink}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
