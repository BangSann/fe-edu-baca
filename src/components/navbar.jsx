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
    <div className="flex justify-center bg-green-400 text-neutral-content sticky top-0">
      <section className="container navbar shadow-sm flex justify-between">
        <div className="">
          <a className="font-bold text-xl">Edu Baca</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {navList.map((item, i) => (
              <li key={i}>
                <Link to={item.route} className="text-shite">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
