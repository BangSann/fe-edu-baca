import { Link, useNavigate } from "react-router-dom";
import MainLayout from "./layout";

const actionList = [
  {
    title: "Materi",
    route: "/materi",
  },
  {
    title: "Latihan  Interaktif",
    route: "/artikel?type=quiz",
  },
  {
    title: "Bank Bacaan",
    route: "/artikel",
  },
  {
    title: "Untuk Guru",
    route: "/perangkat-materi",
  },
  {
    title: "Profil Siswa",
    route: "/profile",
  },
  {
    title: "Kontak",
    route: "/contact",
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <section className="flex flex-col text-start items-center justify-center bg-green-100">
        <section className="container grid grid-cols-1 md:grid-cols-2 p-4 h-[50vh] md:h-[96vh]">
          <section className="space-y-8 flex flex-col justify-center">
            <div className="space-y-3">
              <h1 className="font-bold text-4xl">
                Selamat Datang di EduBaca!
              </h1>
              <p>
                Tingkatkan kemampuan membaca kritis dan pemahaman bacaanmu lewat
                berbagai teks menarik dan latihan interaktif
              </p>
            </div>
            <button
              className="btn bg-green-500 shadow-none outline-none border-none w-40 font-bold text-white"
              onClick={() => navigate("artikel")}
            >
              Mulai Belajar
            </button>
          </section>
          <section className="items-center justify-center hidden md:flex ">
            <img src="eduBanner.png" alt="edubanner" />
          </section>
        </section>
        <section className="w-full  justify-center bg-white py-12 flex p-4">
          <h1></h1>
          <section className="grid grid-cols-2 gap-3 container">
            {actionList.map((item, i) => (
              <Link
                className="bg-green-300 rounded-md p-4"
                to={item.route}
                key={i}
              >
                <h1 className="text-lg md:text-2xl font-semibold">
                  {item.title}
                </h1>
              </Link>
            ))}
          </section>
        </section>
      </section>
    </MainLayout>
  );
};

export default MainPage;
