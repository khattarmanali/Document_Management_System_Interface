import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const LoginWithOtp = () => {
  const [otp, setOtp] = useState("");
  const { dispatch, state } = useContext(UserContext);
  console.log(state, "initialState");
  const handleLogin = () => {
    const token = "abc123";

    dispatch({ type: "SET_TOKEN", payload: token });
  };

  return <div></div>;
};

export default LoginWithOtp;
