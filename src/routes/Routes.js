import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithOtp from "../sections/auth/LoginWithOtp";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import UploadFileForm from "../components/forms/UploadFileForm";
import HomeSection from "../sections/HomeSection";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  useEffect(() => {
    if (state?.token === null) {
      navigate("/");
    }
  }, [state?.token, navigate]);
  return (
    <Routes>
      <Route path="/app/dashboard" element={<UploadFileForm />} />
      <Route path="/app/dashboard/login" element={<LoginWithOtp />} />
      <Route path="/" element={<HomeSection />} />
      <Route path="/upload" element={<UploadFileForm />} />
    </Routes>
  );
};

export default AppRoutes;
