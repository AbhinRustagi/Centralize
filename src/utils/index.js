import {
  findUserProfile,
  signIn,
  register,
  logOut,
  findIfUserNameExists,
} from "./firebase";

export const fb = {
  findUserProfile,
  signIn,
  register,
  logOut,
  findIfUserNameExists,
};
export { default as alertSounds } from "./ALERT_SOUNDS";
export { default as lofiMusic } from "./LOFI_MUSIC";
