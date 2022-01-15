/* eslint-disable no-useless-escape */
import { fb } from ".";

export const validateName = (name) => {
  const rx = /^[A-Za-z]([-']?[A-Za-z]+)*( [A-Za-z]([-']?[A-Za-z]+)*)+$/;
  if (name === "" || !rx.test(name)) {
    return { success: false };
  }
  return { success: true };
};

export const validateEmail = (email) => {
  const rx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "" || !rx.test(email)) {
    return { success: false };
  }
  return { success: true };
};

export const validateUsername = (username) => {
  const rx = /[A-Za-z0-9\._]+/g;
  if (username === "" || !rx.test(username)) {
    return { success: false };
  }

  return { success: true };
};

export const validatePassword = (password) => {
  const rx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
  if (password === "" || !rx.test(password)) {
    return { success: false };
  }
  return { success: true };
};

export const checkIfUsernameExists = async (username) => {
  return await fb.findUserProfile(username).then((res) => {
    if (res.data?.username === username && res.success) {
      return { success: false };
    }
    return { success: true };
  });
};

const validateAll = ({ name, email, password, username }) => {
  let result = { success: false, message: [] };

  if (!validateName(name).success) {
    result = { ...result, message: [...result.message, "Invalid Full Name"] };
  }

  if (!validateEmail(email).success) {
    result = { ...result, message: [...result.message, "Invalid Email"] };
  }

  if (!validatePassword(password).success) {
    result = { ...result, message: [...result.message, "Invalid Password"] };
  }

  if (!validateUsername(username).success) {
    result = { ...result, message: [...result.message, "Invalid Username"] };
  }

  if (result.message.length === 0) {
    return { success: true };
  }
  return result;
};

export default validateAll;
