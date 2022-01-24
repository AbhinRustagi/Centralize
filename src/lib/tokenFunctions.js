import decode from "jwt-decode";

export const readTokens = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token || !refreshToken) {
    return { ok: false };
  }

  try {
    const { exp } = decode(refreshToken);

    if (exp < new Date().getTime() / 1000) {
      return { ok: false };
    }
  } catch (e) {
    return { ok: false };
  }

  return { token, refreshToken, ok: true };
};

export const getUsernameFromToken = () => {
  try {
    const {
      user: { username },
    } = decode(readTokens().token);
    return username;
  } catch (e) {
    return false;
  }
};

export const setTokens = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokens = () => {
  localStorage.clear();
};
