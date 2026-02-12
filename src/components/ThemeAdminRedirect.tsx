import { Navigate } from "react-router-dom";

const ThemeAdminRedirect = () => {
  return <Navigate to="/dashboard" replace />;
};

export default ThemeAdminRedirect;
