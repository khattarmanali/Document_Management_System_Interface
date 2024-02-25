import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithOtpForm from "../sections/LoginWithOtpForm";
import LoginWithOtp from "../sections/auth/LoginWithOtp";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(UserContext);

  useEffect(() => {
    if (state.token) {
      navigate("/app/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginWithOtpForm />} />
      <Route path="/auth/login" element={<LoginWithOtp />} />
    </Routes>
  );
};

export default AppRoutes;
