import { getCookies } from "cookies-next";
import { Link } from "react-router-dom";

const menuGuest = [
  { title: "Beranda", route: "/" },
  { title: "Bacaan", route: "/bacaan" },
  { title: "Proyek Literasi", route: "/artikel?type=quiz" },
  { title: "Kontak", route: "/contact" },
  { title: "Masuk", route: "/login" },
];

const menuLoggedIn = [
  { title: "Beranda", route: "/" },
  { title: "Bacaan", route: "/bacaan" },
  { title: "Proyek Literasi", route: "/artikel?type=quiz" },
  { title: "Kontak", route: "/contact" },
  { title: "profil", route: "/profile" },
];

const Navbar = () => {
  const cookie = getCookies();
  const accessToken = cookie.accessToken;
  const navItems = accessToken ? menuLoggedIn : menuGuest;

  return (
    <div className="sticky top-0 z-50 bg-green-400 text-neutral-content">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
            >
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link to={item.route}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/logo_kementrian.png" alt="Logo" className="w-12 h-auto" />
            <Link
              to="/"
              className="font-bold text-xl btn btn-ghost normal-case text-white text-start p-0"
            >
              EduBaca
            </Link>
          </div>
        </div>

        {/* Navbar Center - Desktop */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link to={item.route}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
