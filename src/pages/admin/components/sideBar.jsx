import { BsBook, BsCheckCircle, BsFilePerson, BsJournalBookmark } from "react-icons/bs";
import { FiBook, FiHome } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../../lib/redux/slice/authSlice";
import { deleteCookie } from "cookies-next";
import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

const navItems = [
  {
    title: "Dashboard",
    icon: <FiHome size={24} />,
    path: "",
  },
  {
    title: "Pengguna",
    icon: <BsFilePerson size={24} />,
    path: "users",
  },
  {
    title: "Sekolah",
    icon: <FaSchool size={24} />,
    path: "sekolah",
  },
  {
    title: "Presensi Siswa",
    icon: <BsCheckCircle size={24} />,
    path: "presensi-siswa",
  },
  {
    title: "Artikel",
    icon: <BsJournalBookmark size={24} />,
    path: "artikel",
  },
  {
    title: "Materi Siswa",
    icon: <BsBook size={24} />,
    path: "materi",
  },
  {
    title: "Modul Guru",
    icon: <FaChalkboardTeacher size={24} />,
    path: "perangkat-materi",
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
        navigate("/login");
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
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
