import React, { createContext, useContext, useReducer } from "react";

export const User = createContext();

export const UserProvider = ({ children, initialState, reducer }) => (
  <User.Provider value={useReducer(reducer, initialState)}>
    {children}
  </User.Provider>
);

const useUserInfo = () => useContext(User);

export default useUserInfo;
