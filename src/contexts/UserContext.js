import React, { createContext, useReducer, useEffect } from "react";

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

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedMobileNumber = localStorage.getItem("mobileNumber");
    if (storedToken) {
      dispatch({ type: "SET_TOKEN", payload: storedToken });
    }
    if (storedMobileNumber) {
      dispatch({ type: "SET_MOBILE_NUMBER", payload: storedMobileNumber });
    }
  }, []);

  // Persist data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("token", state.token);
    localStorage.setItem("mobileNumber", state.mobileNumber);
  }, [state.token, state.mobileNumber]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
