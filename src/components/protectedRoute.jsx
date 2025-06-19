import { Navigate } from "react-router-dom";
import { getCookies } from "cookies-next";
import { useSelector } from "react-redux";
import DefaultPage from "./defaultPage";

const ProtectedRoute = ({ children, role }) => {
  const cookies = getCookies();
  const accessToken = cookies?.accessToken;

  if (!accessToken) {
    return <DefaultPage />;
  }

  return children;
};

export default ProtectedRoute;
