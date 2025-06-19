import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout";
import { deleteCookie } from "cookies-next";
import { signOut } from "../../lib/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchPresensiByUser } from "../../lib/redux/slice/presensiSlice";

const ProfilePage = () => {
  const { isLoading, data: dataProfile } = useSelector((state) => state.auth);
  const { isLoading: loadingPresensi, data: dataPresensi } = useSelector(
    (state) => state.presensi
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSignOut() {
    try {
      const res = await dispatch(signOut());
      if (signOut.fulfilled.match(res)) {
        deleteCookie("accessToken");
        navigate("/login");
      } else {
        console.log("tidak  bisa logout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetPresensiByUser() {
    try {
      const res = await dispatch(
        fetchPresensiByUser({
          id_user: dataProfile?.id,
          id_kelas: dataProfile?.kelas?.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  console.log(dataProfile);

  useEffect(() => {
    if (dataProfile?.id) {
      handleGetPresensiByUser();
    }
  }, [dataProfile?.id]);

  function getAvatarInitial(name) {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  return (
    <MainLayout>
      <section className="h-[calc(100vh-65px)] flex justify-center mt-4">
        <div className="card bg-base-100 container space-y-4">
          <div className="flex justify-between shadow-sm p-6">
            {/* Avatar */}
            <div className="flex items-center gap-2 w-full">
              <div className="avatar avatar-online avatar-placeholder col-span-1">
                <div className="bg-primary text-primary-content w-24 rounded-full">
                  <span className="text-4xl">
                    {getAvatarInitial(dataProfile?.name || "")}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-start">
                <h2 className="text-xl font-semibold">{dataProfile?.name}</h2>
                <p className="text-sm text-gray-500">
                  @{dataProfile?.username}
                </p>
                <p className="text-sm text-gray-600">
                  {dataProfile?.sekolah?.nama_sekolah}
                </p>
              </div>
            </div>

            {/* User Info */}

            <button
              className="btn btn-error btn-sm text-white"
              onClick={handleSignOut}
            >
              Log Out
            </button>

            {/* Logout Button */}
          </div>
          <div className="flex flex-col gap-4 text-start shadow-sm p-6 w-full bg-white rounded-md">
            <h1 className="text-xl font-semibold">
              Resume Presensi {dataProfile?.kelas?.kelas}
            </h1>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-2/3">Tanggal</th>
                    <th className="w-1/3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPresensi?.length > 0 ? (
                    dataPresensi.map((item, index) => (
                      <tr key={index}>
                        <td>{item.tanggal}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center text-gray-500">
                        Tidak ada data presensi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
