import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithOtp from "../sections/auth/LoginWithOtp";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import UploadFileForm from "../components/forms/UploadFileForm";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (!state.token) {
      navigate("/auth/login");
    } else {
      navigate("/app/dashboard");
    }
  }, [state.token, navigate]);

  return (
    <Routes>
      <Route path="/app/dashboard" element={<UploadFileForm />} />
      <Route path="/auth/login" element={<LoginWithOtp />} />
    </Routes>
  );
};

export default AppRoutes;
