import { Navigate, useLocation } from "react-router-dom";

/** The home page lives at /inicio; the bare domain sends there, keeping any #place (e.g. /#contact). */
export const RootRedirect = () => {
  const { hash } = useLocation();
  return <Navigate to={{ pathname: "/inicio", hash }} replace />;
};
