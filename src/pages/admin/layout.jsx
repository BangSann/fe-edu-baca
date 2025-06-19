import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { deleteCookie, getCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../lib/redux/slice/authSlice";

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const breadcrumbsItems = pathname.split("/").filter((item) => item !== "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = getCookies();
  const accessToken = cookies?.accessToken;

  const [isChecking, setIsChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      setIsChecking(true);
      try {
        if (!accessToken) {
          navigate("/login");
          return;
        }

        const res = await dispatch(getUserProfile());
        if (!getUserProfile.fulfilled.match(res)) {
          deleteCookie("accessToken");
          navigate("/login");
          return;
        }

        const userData = res.payload.data;
        if (userData?.role?.toLowerCase() !== "admin") {
          navigate("/");
          return;
        }

        // Semua pengecekan lolos
        setAllowed(true);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    handleAuth();
  }, [accessToken, dispatch, navigate]);

  if (isChecking || !allowed) {
    return null;
  }

  return (
    <section>
      <SideBar />
      <section className="w-full p-4 flex justify-between items-center border-b-[1px] border-gray-500">
        <div className="breadcrumbs text-sm">
          <ul>
            {breadcrumbsItems.map((item, i) => (
              <li key={i}>
                <a className="capitalize">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <label htmlFor="my-drawer" className="drawer-button btn btn-outline">
          <GiHamburgerMenu />
        </label>
      </section>
      <section className="p-4 text-start">{children}</section>
    </section>
  );
};

export default AdminLayout;
