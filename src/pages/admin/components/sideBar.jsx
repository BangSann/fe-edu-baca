import { BsFilePerson } from "react-icons/bs";
import { FiBook, FiHome } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../../lib/redux/slice/authSlice";
import { deleteCookie } from "cookies-next";
import { FaSchool } from "react-icons/fa";

const navItems = [
  {
    title: "Dashboard",
    icon: <FiHome size={24} />,
    path: "",
  },
  {
    title: "Users",
    icon: <BsFilePerson size={24} />,
    path: "users",
  },
  {
    title: "Sekolah",
    icon: <FaSchool size={24} />,
    path: "sekolah",
  },
  {
    title: "Artikel",
    icon: <FiBook size={24} />,
    path: "artikel",
  },
  {
    title: "Materi Siswa",
    icon: <FiBook size={24} />,
    path: "",
  },
  {
    title: "Bank Bacaan",
    icon: <FiBook size={24} />,
    path: "",
  },
  {
    title: "Presensi Siswa",
    icon: <FiBook size={24} />,
    path: "",
  },
  {
    title: "Modul Guru",
    icon: <FiBook size={24} />,
    path: "",
  },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      const res = await dispatch(signOut());
      if (signOut.fulfilled.match(res)) {
        deleteCookie("accessToken");
        navigate("/eduadmin/login");
      } else {
        console.log("tidak  bisa logout");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link to={`/eduadmin/${item.path}`}>
                {item.icon}
                <p className="text-lg font-light">{item.title}</p>
              </Link>
            </li>
          ))}
          <li className="p-4 absolute bottom-0">
            <button
              className="btn btn-error w-full text-white "
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
