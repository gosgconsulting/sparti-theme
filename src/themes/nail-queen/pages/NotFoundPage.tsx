import { Navigate } from "react-router-dom";

export default function NotFoundPage({
  basePath,
}: {
  basePath: string;
  path?: string;
}) {
  return <Navigate to={basePath} replace />;
}
