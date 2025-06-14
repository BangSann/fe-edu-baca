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

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route path="/EduAdmin">
            <Route index element={<AdminDashboardPage />} />

            <Route path="kelas" element={<KelasAdminPage />} />
            <Route path="sekolah" element={<SekolahAdminPage />} />

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
