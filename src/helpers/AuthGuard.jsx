import { Navigate, Outlet } from "react-router-dom";
import { accountService } from "../_services/account.service";

export const AuthGuard = () => {
  const logged = accountService.isLogged();

  if (!logged) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
