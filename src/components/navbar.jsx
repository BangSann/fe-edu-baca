import { Link } from "react-router-dom";

const navList = [
  {
    title: "Beranda",
    route: "/",
  },
  {
    title: "Bacaan",
    route: "/artikel",
  },
  {
    title: "Project Literasi",
    route: "/artikel?type=quiz",
  },
  {
    title: "Contact",
    route: "/contact",
  },
  {
    title: "Profile",
    route: "/profile",
  },
];

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-green-400 text-neutral-content">
      <div className="navbar container mx-auto">
        {/* Start */}
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
              {navList.map((item, i) => (
                <li key={i}>
                  <Link to={item.route}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/logo_unp.png" className="w-12 h-auto" />
            <Link
              to="/"
              className="font-bold text-xl btn btn-ghost normal-case text-white text-start p-0"
            >
              Edu Baca
            </Link>
          </div>
        </div>

        {/* Center (hidden on mobile) */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navList.map((item, i) => (
              <li key={i}>
                <Link to={item.route}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* End (optional) */}
        <div className="hidden lg:flex">
          {/* Tambahkan tombol login, search, dll jika dibutuhkan */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
