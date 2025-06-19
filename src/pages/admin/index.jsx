import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "./layout";
import { useEffect } from "react";
import { getDashboard } from "../../lib/redux/slice/dahsboardSlice";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { isLoading, data: dashboardData } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    async function handleGetDashboard(params) {
      dispatch(getDashboard());
    }

    handleGetDashboard();
  }, []);

  return (
    <AdminLayout>
      <section className="">
        <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-32 w-full"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardDashboard
              title="Siswa"
              value={dashboardData?.User}
              color="bg-teal-100"
            />
            <CardDashboard
              title="Artikel"
              value={dashboardData?.Artikel}
              color="bg-blue-100"
            />
            <CardDashboard
              title="Sekolah"
              value={dashboardData?.Sekolah}
              color="bg-indigo-100"
            />
            <CardDashboard
              title="Kelas"
              value={dashboardData?.Kelas}
              color="bg-green-100"
            />
            <CardDashboard
              title="Materi Siswa"
              value={dashboardData?.Materi}
              color="bg-yellow-100"
            />
            {/* <CardDashboard
              title="Nilai"
              value={dashboardData?.Nilai}
              color="bg-purple-100"
            /> */}
            <CardDashboard
              title="Modul Guru"
              value={dashboardData?.["Perangkat Materi"]}
              color="bg-pink-100"
            />
            {/* <CardDashboard
              title="Presensi"
              value={dashboardData?.Presensi}
              color="bg-red-100"
            /> */}

            {/* <CardDashboard
              title="Soal"
              value={dashboardData?.Soal}
              color="bg-orange-100"
            /> */}
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

const CardDashboard = ({ title, value, color }) => {
  return (
    <div className={`card ${color} shadow-md`}>
      <div className="card-body">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-gray-900">{value ?? 0}</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
