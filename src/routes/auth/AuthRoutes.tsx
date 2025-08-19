import { Route, Routes } from "react-router-dom";
import { paths } from "../../hooks/paths";
import NotFoundPage from "../../pages/NotFoundPage";
import { SendOtp, Login, VerifyOtp, UpdatePassword } from "../../pages/auth";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.sendOtp} element={<SendOtp />} />
      <Route path={paths.verifyOtp} element={<VerifyOtp />} />
      <Route path={paths.updatePass} element={<UpdatePassword />} />
      <Route path={"*"} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
