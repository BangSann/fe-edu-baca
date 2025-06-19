import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPresensiTanggal } from "../../../../../lib/redux/slice/presensiSlice";
import { BiChevronLeft } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const RekapPresensi = ({ tanggal }) => {
  const { id_kelas } = useParams();
  const dispatch = useDispatch();
  const { data: presensiData, loading: presensiLoading } = useSelector(
    (state) => state.presensi
  );

  // State untuk menyimpan status presensi per siswa
  const [presensiForm, setPresensiForm] = useState({});

  const fetchInitialData = () => {
    if (id_kelas && tanggal) {
      dispatch(fetchPresensiTanggal({ id_kelas, tanggal }));
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [tanggal]);

  console.log(presensiData);

  return (
    <>
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
            <div className="flex items-center gap-2">Tanggal : {tanggal}</div>
          </section>
          <section>
            {presensiData[0]?.siswa?.length > 0 ? (
              <section>
                {presensiData[0].siswa.map((siswa) => (
                  <div
                    key={siswa.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{siswa.name}</span>
                    <span>
                      {siswa.presensi?.filter((e)=>e.tanggal == tanggal)[0]
                        ?.status || "belum presensi"}
                    </span>
                  </div>
                ))}
              </section>
            ) : (
              <div className="text-center text-gray-500 mt-4">
                Belum ada data presensi untuk tanggal ini.
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default RekapPresensi;
