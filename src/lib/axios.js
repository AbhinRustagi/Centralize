import axios from "axios";
import { setTokens } from "./tokenFunctions";

const ENDPOINT = "https://centralize.abhinrustagi.xyz/.netlify/functions/api";

export const getUserDetails = async ({ token, refreshToken }) => {
  return await axios(ENDPOINT + "/getUserProfileDetails", {
    method: "GET",
    headers: { "x-token": token, "x-refresh-token": refreshToken },
  })
    .then((res) => {
      if (res.headers["x-token"] || res.headers["x-refresh-token"]) {
        setTokens(res.headers["x-token"], res.headers["x-refresh-token"]);
      }

      return res.data;
    })
    .catch((e) => ({ ok: false, message: e.message }));
};

export const logIn = async (email, password) => {
  return await axios(ENDPOINT + "/login", {
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      if (!res.data.ok) return { ok: false, message: res.data.message };

      const { token, refreshToken } = res.data;
      setTokens(token, refreshToken);
      return { ok: true };
    })
    .catch((e) => {
      console.log(e);
      return {
        ok: false,
      };
    });
};

export const register = async ({
  email,
  password,
  username,
  displayUrl,
  name,
}) => {
  return await axios(ENDPOINT + "/register", {
    method: "POST",
    data: {
      email,
      password,
      username,
      displayUrl,
      name,
    },
  })
    .then((res) => {
      if (!res.data.ok) return { ok: false, message: res.data.message };

      const { token, refreshToken } = res.data;
      setTokens(token, refreshToken);
      return { ok: true };
    })
    .catch((e) => ({
      ok: false,
      message: e.response.data.message,
    }));
};
