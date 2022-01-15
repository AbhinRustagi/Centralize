import {
  findUserProfile,
  signIn,
  register,
  logOut,
  sendResetPasswordLink,
  sendAccountVerificationEMail,
  auth,
} from "./firebase";

import validateAll, {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
  checkIfUsernameExists,
} from "./validations";

export const fb = {
  findUserProfile,
  signIn,
  register,
  logOut,
  sendResetPasswordLink,
  sendAccountVerificationEMail,
  auth,
};

export const vl = {
  validateAll,
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
  checkIfUsernameExists,
};
