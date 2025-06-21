import { Navigate, useNavigate } from "react-router-dom";
import { getCookies } from "cookies-next";
import { useSelector } from "react-redux";
import DefaultPage from "./defaultPage";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children, role }) => {
  const cookies = getCookies();
  const accessToken = cookies?.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      Swal.fire({
        icon: "info",
        title: "Mode Tamu",
        text: "Anda perlu login untuk mengakses halaman ini!",
        showDenyButton: true,
        confirmButtonText: "Masuk",
        denyButtonText: "Tetap Keluar",
        denyButtonColor: "red",
        confirmButtonColor: "green",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
        if (result.isDenied) {
          navigate("/")
        }
      });
    }
  }, [accessToken]);

  if (!accessToken) {
    return <section />;
  }
  return children;
};

export default ProtectedRoute;
