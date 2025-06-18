import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-300 text-neutral">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        {/* Section: Logo */}
        <div className="space-y-2 p-3">
          <h2 className="text-lg font-bold text-center md:text-start">
            EduBaca
          </h2>
          <p className="text-sm text-center md:text-start">
            Platform edukasi dan dongeng nusantara untuk anak-anak Indonesia.
          </p>
          <div className="flex gap-2 justify-center md:justify-start">
            <span className="bg-white p-2 rounded-full shadow">Logo1</span>
            <span className="bg-white p-2 rounded-full shadow">Logo2</span>
            <span className="bg-white p-2 rounded-full shadow">Logo3</span>
          </div>
        </div>

        {/* Section: Navigation */}
        <div>
          <h1 className="footer-title text-center md:text-start px-3">
            Navigasi
          </h1>
          <ul className="menu md:p-0 px-4">
            <li>
              <Link to={"/"} className="link link-hover">
                Beranda
              </Link>
            </li>
            <li>
              <Link to={"/artikel"} className="link link-hover">
                Bacaan
              </Link>
            </li>
            <li>
              <Link to={"/profile"} className="link link-hover">
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="link link-hover">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Section: Sosial Media */}
        <div>
          <h1 className="footer-title text-center md:text-start px-3">
            Ikuti Kami
          </h1>
          <ul className="menu md:p-0 px-4">
            <li>
              <Link to={""} className="link link-hover">
                Facebook
              </Link>
            </li>
            <li>
              <Link to={""} className="link link-hover">
                Instagram
              </Link>
            </li>
            <li>
              <Link to={""} className="link link-hover">
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-3 bg-slate-700 text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EduBaca. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
