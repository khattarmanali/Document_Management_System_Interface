import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithOtpForm from "../sections/LoginWithOtpForm";
import LoginWithOtp from "../sections/auth/LoginWithOtp";
import { useEffect } from "react";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginWithOtpForm />} />
      <Route path="/auth/login" element={<LoginWithOtp />} />
    </Routes>
  );
};

export default AppRoutes;
