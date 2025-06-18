import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPresensiById } from "../../../../lib/redux/slice/presensiSlice";
import { useEffect } from "react";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { getDataKelas } from "../../../../lib/redux/slice/kelasAdminSlice";
import { getDataSekolah } from "../../../../lib/redux/slice/sekolahAdminSlice";
import { BsPerson } from "react-icons/bs";

const PresensiDetail = () => {
  const { id_kelas } = useParams();

  const dispatch = useDispatch();
  const { data: presensiData, loading: presensiLoading } = useSelector(
    (state) => state.presensi
  );

  const fetchInitialData = async () => {
    dispatch(fetchPresensiById(id_kelas));
  };
  console.log(presensiData);
  useEffect(() => {
    fetchInitialData();
  }, [id_kelas]);

  return (
    <AdminLayout>
      {presensiLoading ? (
        <section className="skeleton h-36 w-full"></section>
      ) : (
        <>
          <section className="flex justify-between">
            <div className="flex w-2/5">
              <Link to={"../"} className="btn btn-outline rounded-e-none">
                <BiChevronLeft />
              </Link>
              <h1 className="input input-neutral w-full rounded-none bg-slate-200">
                {presensiData[0]?.kelas}
              </h1>
              <p className="btn btn-outline rounded-s-none">
                <BsPerson />
                {presensiData[0]?.siswa?.length || 0}
              </p>
            </div>
            <button className="btn btn-primary">
              <BiPlus size={24} /> Tambah Presensi Hari Ini
            </button>
          </section>
          <section className="mt-4">
            <div className="overflow-x-auto shadow">
              <table className="table table-zebra border-gray-400">
                {/* head */}
                <thead>
                  <tr>
                    <th className="w-12">No</th>
                    <th>Tanggal</th>
                    <th>Masuk</th>
                    <th>Alpha</th>
                    <th>Izin</th>
                    <th>Null</th>

                    <th className="w-44">Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
};

export default PresensiDetail;
