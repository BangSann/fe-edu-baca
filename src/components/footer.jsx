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
            Media edukasi untuk membantu meningkatkan kemampuan literasi dan
            berpikir kritis anak Indonesia.
          </p>
          <div className="flex w-full gap-2 justify-center md:justify-start mt-3">
            <span className="">
              {" "}
              <img src="/logo_kementrian.png" className="h-12" />
            </span>
            <span className="">
              {" "}
              <img src="/DPPM.png" className="h-12" />
            </span>
            <span className="">
              {" "}
              <img src="/logo_unp.png" className="h-12" />
            </span>
            <span className="">
              {" "}
              <img src="/garuda.png" className="h-12" />
            </span>
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
                Profil
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="link link-hover">
                Kontak
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
              <Link
                to={"https://www.facebook.com/profile.php?id=61577723757851"}
                className="link link-hover"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                to={
                  "https://www.instagram.com/edubaca.unpkdr?igsh=N3FvbXprNWg1aTds"
                }
                className="link link-hover"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                to={"https://www.youtube.com/channel/UCuFvZk9qrFSdxxwk6GYBK3Q"}
                className="link link-hover"
              >
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
