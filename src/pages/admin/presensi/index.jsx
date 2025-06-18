import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../layout";
import { fetchPresensi } from "../../../lib/redux/slice/presensiSlice";
import { getDataSekolah } from "../../../lib/redux/slice/sekolahAdminSlice";
import { getDataKelas } from "../../../lib/redux/slice/kelasAdminSlice";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";

const PresensiAdminPage = () => {
  const navigate = useNavigate();

  //   presensei state
  const dispatch = useDispatch();
  const [id_sekolah, setIdSekolah] = useState("");
  const [id_kelas, setIdKelas] = useState("");
  //   presensei state
  // Redux State
  const { data: presensiData, loading: presensiLoading } = useSelector(
    (state) => state.presensi
  );
  const { data: sekolahData, isLoading: sekolahLoading } = useSelector(
    (state) => state.sekolahAdmin
  );
  const { isLoading: kelasLoading, data: dataKelas } = useSelector(
    (state) => state.kelasAdmin
  );

  const selectedKelas = dataKelas?.filter((item) => item?.id == id_sekolah);

  const isLoading = sekolahLoading || kelasLoading || presensiLoading;

  // Fetch all required data
  const fetchInitialData = async () => {
    dispatch(fetchPresensi());
    dispatch(getDataSekolah());
    dispatch(getDataKelas());
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const filteredPresensi = id_kelas
    ? presensiData.filter((item) => item.id === parseInt(id_kelas))
    : presensiData;

  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const currentDatas = filteredPresensi?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Presensi Siswa</h1>
        <div className="flex w-2/5">
          <select
            className="select select-neutral w-full max-w-sm rounded-e-none"
            onChange={(e) => {
              setIdSekolah(e.target.value);
              setIdKelas("");
            }}
          >
            <option value="">-- Pilih Sekolah --</option>
            {sekolahData?.map((sekolah, i) => (
              <option key={i} value={sekolah.id}>
                {sekolah.nama_sekolah}
              </option>
            ))}
          </select>
          <select
            className="select select-neutral w-full max-w-sm rounded-s-none"
            onChange={(e) => setIdKelas(e.target.value)}
            value={id_kelas}
            disabled={
              !selectedKelas?.[0]?.kelas ||
              selectedKelas?.[0]?.kelas?.length == 0
            }
          >
            <option value="">-- Pilih Kelas --</option>
            {selectedKelas?.[0]?.kelas?.map((kelas, i) => (
              <option key={i} value={kelas.id}>
                {kelas.kelas}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <section className="skeleton w-full h-36 mt-4" />
      ) : (
        <section className="mt-4">
          <div className="overflow-x-auto shadow">
            <table className="table table-zebra border-gray-400">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-12">No</th>
                  <th>Kelas</th>
                  <th>Jumlah Siswa</th>

                  <th className="w-44">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDatas?.map((item, i) => (
                  <tr className="" key={i}>
                    <td>{i + 1}</td>
                    <td>{item?.kelas}</td>
                    <td>{item?.siswa?.length}</td>
                    <td>
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => navigate(`${item?.id}`)}
                      >
                        Buka Presensi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            dataLength={filteredPresensi?.length}
            dataShowCount={showDataIndex}
            setDataShowItems={(e) => setDataShowItems(e)}
          />
        </section>
      )}
    </AdminLayout>
  );
};

export default PresensiAdminPage;
