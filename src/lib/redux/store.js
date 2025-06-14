import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import usersAdminSlice from "./slice/usersAdminSlice"
import sekolahAdminSlice from "./slice/sekolahAdminSlice"
import kelasAdminSlice from "./slice/kelasAdminSlice"

export default configureStore({
  reducer: {
    auth: authSlice,
    usersAdmin: usersAdminSlice,
    sekolahAdmin : sekolahAdminSlice,
    kelasAdmin : kelasAdminSlice
  },
});
