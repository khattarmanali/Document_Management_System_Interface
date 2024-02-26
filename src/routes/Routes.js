import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithOtp from "../sections/auth/LoginWithOtp";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import UploadFileForm from "../components/forms/UploadFileForm";
import HomeSection from "../sections/HomeSection";
import LoginWithUserPass from "../sections/auth/LoginWithUserPass";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  console.log(state, "state");
  useEffect(() => {
    if (
      state?.token === null ||
      state?.token === undefined ||
      state?.token === "" ||
      state?.token === "null"
    ) {
      navigate("/");
    }
  }, [state?.token, navigate]);
  return (
    <Routes>
      <Route path="/app/dashboard" element={<UploadFileForm />} />
      <Route path="/login" element={<LoginWithUserPass />} />
      <Route path="/" element={<HomeSection />} />
      <Route path="/upload" element={<UploadFileForm />} />
    </Routes>
  );
};

export default AppRoutes;
