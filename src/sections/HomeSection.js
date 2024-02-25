import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoginWithOtp from "./auth/LoginWithOtp";
import { Outlet } from "react-router-dom";
import UploadFileForm from "../components/forms/UploadFileForm";
import Dashbroad from "./dashbroad/Dashbroad";

function HomeSection() {
  const { dispatch, state } = useContext(UserContext);

  return <>{state?.token === null ? <LoginWithOtp /> : <Dashbroad />}</>;
}

export default HomeSection;
