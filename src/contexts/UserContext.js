import React, { createContext, useReducer } from "react";

const initialState = {
  token: null,
  mobileNumber: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_MOBILE_NUMBER":
      return {
        ...state,
        mobileNumber: action.payload,
      };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
