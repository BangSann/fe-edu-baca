import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages";
import LoginPage from "./pages/login";
import AdminDashboardPage from "./pages/admin";
import UsersAdminPage from "./pages/admin/users";
import ArtikelAdminPage from "./pages/admin/artikel";
import LoginAdminPage from "./pages/admin/login";
import AddArtikelPage from "./pages/admin/artikel/addArtikel";
import EditArtikelPage from "./pages/admin/artikel/editArtikel.jsx";
import { ToastContainer } from "react-toastify";
import ViewArtikelPage from "./pages/admin/artikel/viewArtikel/index.jsx";
import SoalLiterasiPage from "./pages/admin/artikel/literasi/soal/index.jsx";
import NilaiLiterasiPage from "./pages/admin/artikel/literasi/nilai/index.jsx";
import LiterasiPage from "./pages/admin/artikel/literasi/index.jsx";
import KelasAdminPage from "./pages/admin/kelas/index.jsx";
import SekolahAdminPage from "./pages/admin/sekolah/index.jsx";
import ArtikelPage from "./pages/artikel/index.jsx";
import ProfilePage from "./pages/profile/index.jsx";
import ViewArtikelUsersPage from "./pages/artikel/viewArtikel/index.jsx";
import MateriUsersPage from "./pages/materi/index.jsx";
import ViewUsersMateri from "./pages/materi/viewMateri/index.jsx";
import PerangkatMateriPage from "./pages/perangkatMateri/index.jsx";
import MateriAdminPage from "./pages/admin/materiAdmin/index.jsx";
import ViewMateriAdminPage from "./pages/admin/materiAdmin/viewMateri/index.jsx";
import PerangkatMateriAdminPage from "./pages/admin/untukGuru/index.jsx";
import ViewModulAdminPage from "./pages/admin/untukGuru/viewModul/index.jsx";
import PresensiAdminPage from "./pages/admin/presensi/index.jsx";
import PresensiDetail from "./pages/admin/presensi/presensiDetail/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="artikel">
              <Route index element={<ArtikelPage />} />
              <Route path=":id_artikel" element={<ViewArtikelUsersPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="materi">
              <Route index element={<MateriUsersPage />} />
              <Route path=":id_materi" element={<ViewUsersMateri />} />
            </Route>
            <Route path="perangkat-materi">
              <Route index element={<PerangkatMateriPage />} />
              <Route path=":id_perangkat" element={<ViewUsersMateri />} />
            </Route>
          </Route>

          <Route path="/EduAdmin">
            <Route index element={<AdminDashboardPage />} />

            <Route path="sekolah">
              <Route index element={<SekolahAdminPage />} />
              <Route path=":id_sekolah/kelas" element={<KelasAdminPage />} />
            </Route>

            <Route path="materi">
              <Route index element={<MateriAdminPage />} />
              <Route path=":id_materi" element={<ViewMateriAdminPage />} />
            </Route>

            <Route path="perangkat-materi">
              <Route index element={<PerangkatMateriAdminPage />} />
              <Route path=":id_modul" element={<ViewModulAdminPage />} />
            </Route>

            <Route path="presensi-siswa">
              <Route index element={<PresensiAdminPage />} />
              <Route path=":id_kelas" element={<PresensiDetail />} />
            </Route>

            <Route path="users" element={<UsersAdminPage />} />

            <Route path="artikel">
              <Route index element={<ArtikelAdminPage />} />
              <Route path="add" element={<AddArtikelPage />} />
              <Route path="edit/:id_artikel" element={<EditArtikelPage />} />
              <Route path="view/:id_artikel">
                <Route index element={<ViewArtikelPage />} />
                <Route path="literasi">
                  <Route index element={<LiterasiPage />} />
                  <Route path="soal" element={<SoalLiterasiPage />} />
                  <Route path="nilai" element={<NilaiLiterasiPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="login" element={<LoginAdminPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </BrowserRouter>
  );
}

export default App;
