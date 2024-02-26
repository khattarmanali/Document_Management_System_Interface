import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  token: null,
  mobileNumber: null,
};

const reducer = (state, action) => {
  console.log(action, "action");
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
    case "REMOVE_USER":
      return {
        ...state,
        token: null,
        mobileNumber: null,
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
    if (state.token) {
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("token");
    }
    if (state.mobileNumber) {
      localStorage.setItem("mobileNumber", state.mobileNumber);
    } else {
      localStorage.removeItem("mobileNumber");
    }
  }, [state.token, state.mobileNumber]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
