import { getCookies } from "cookies-next";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../lib/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DefaultPage from "../components/defaultPage";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { accessToken } = getCookies({
    httpOnly: true,
    secure: true,
  });

  const dispatch = useDispatch();
  const { isLoading, data: dataProfile } = useSelector((state) => state.auth);

  async function handleGetProfile() {
    try {
      const res = await dispatch(getUserProfile());
      if (!getUserProfile.fulfilled.match(res)) {
        deleteCookie("accessToken");
        navigate("/eduadmin/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) {
      handleGetProfile();
    } else {
      navigate("/login");
    }
  }, [accessToken]);

  if (isLoading) {
    return <section></section>;
  } else if (dataProfile && !isLoading) {
    if (dataProfile[0]?.role?.toLowerCase() == "siswa") {
      return <DefaultPage />;
    }
  }
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default MainLayout;
