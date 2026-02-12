import { Navigate } from "react-router-dom";

const TemplateAdminRedirect = () => {
  return <Navigate to="/dashboard" replace />;
};

export default TemplateAdminRedirect;
