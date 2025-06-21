import { deleteCookie, getCookies } from "cookies-next";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../lib/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/footer";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = getCookies();
  const accessToken = cookies?.accessToken;

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const res = await dispatch(getUserProfile());

        if (!getUserProfile.fulfilled.match(res)) {
          deleteCookie("accessToken");
          navigate("/")
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      handleAuth();
    }
  }, [accessToken, dispatch, navigate]);

  return (
    <section>
      <Navbar />
      <section>{children}</section>
      <Footer />
    </section>
  );
};

export default MainLayout;
