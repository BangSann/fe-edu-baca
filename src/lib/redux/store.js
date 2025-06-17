import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersAdminSlice from "./slice/usersAdminSlice";
import sekolahAdminSlice from "./slice/sekolahAdminSlice";
import kelasAdminSlice from "./slice/kelasAdminSlice";
import artikelAdminSlice from "./slice/artikelAdminSlice";
import soalLiterasiSlice from "./slice/soalLiterasiSlice";
import nilaiLiterasiSlice from "./slice/nilaiLiterasiSlice";
import materiSlice from "./slice/materiSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    usersAdmin: usersAdminSlice,
    sekolahAdmin: sekolahAdminSlice,
    kelasAdmin: kelasAdminSlice,
    artikelAdmin: artikelAdminSlice,
    soalLiterasi: soalLiterasiSlice,
    nilaiLiterasi: nilaiLiterasiSlice,
    materi: materiSlice,
  },
});
