import { Route, Routes } from "react-router-dom";
import LoginWithOtpForm from "../sections/LoginWithOtpForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginWithOtpForm />} />
    </Routes>
  );
};

export default AppRoutes;
