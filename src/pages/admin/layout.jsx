import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { deleteCookie, getCookies } from "cookies-next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../lib/redux/slice/authSlice";
import DefaultPage from "../../components/defaultPage";

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const breadcrumbsItems = pathname.split("/").filter((item) => item !== "");
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
      navigate("/eduAdmin/login");
    }
  }, [accessToken]);

  if (isLoading) {
    return <section></section>;
  } else if (dataProfile && !isLoading) {
    if (dataProfile?.role?.toLowerCase() !== "admin") {
      return <DefaultPage />;
    }
  }

  return (
    <section>
      <SideBar />
      <section className="w-full p-4 flex justify-between items-center border-b-[1px] border-gray-500">
        <div className="breadcrumbs text-sm">
          <ul>
            {breadcrumbsItems?.map((item, i) => (
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
