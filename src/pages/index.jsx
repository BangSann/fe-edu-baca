import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import MainLayout from "./layout";

const actionList = [
  {
    title: "Materi",
    route: "/",
  },
  {
    title: "Latihan  Interaktif",
    route: "/",
  },
  {
    title: "Bank Bacaan",
    route: "/",
  },
  {
    title: "Untuk Guru",
    route: "/",
  },
  {
    title: "Profil Siswa",
    route: "/",
  },
  {
    title: "Kontak",
    route: "/",
  },
];

const MainPage = () => {
  return (
    <MainLayout>
      <section className="flex flex-col text-start items-center justify-center bg-green-100">
        <section
          className="container grid grid-cols-2"
          style={{ minHeight: "100vh" }}
        >
          <section className="space-y-3 flex flex-col justify-center">
            <h1 className="font-bold text-4xl">Selamat Datang di EduBaca !</h1>
            <p>
              Tingkatkan kemampuan membaca kritis dan pemahaman bacaanmu lewat
              berbagai teks menarik dan latihan interaktif
            </p>
            <button className="btn bg-green-500 shadow-none outline-none border-none w-40">
              Mulai Belajar
            </button>
          </section>
          <section className="flex items-center justify-center">
            <img src="eduBanner.png" alt="edubanner" />
          </section>
        </section>
        <section className="w-full flex justify-center bg-white py-12">
            <h1>

            </h1>
          <section className="grid grid-cols-2 gap-3 container">
            {actionList.map((item, i) => (
              <Link className="bg-green-400 rounded-md p-4" to={item.route} key={i}>
                <h1 className="text-2xl font-semibold">{item.title}</h1>
              </Link>
            ))}
          </section>
          
        </section>
      </section>
    </MainLayout>
  );
};

export default MainPage;
