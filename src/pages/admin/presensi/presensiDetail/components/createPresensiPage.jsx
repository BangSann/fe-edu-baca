import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import {
  createPresensi,
  fetchPresensiTanggal,
} from "../../../../../lib/redux/slice/presensiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CreatePresensiPage = () => {
  const { id_kelas } = useParams();
  const [tanggal, setTanggal] = useState();
  const dispatch = useDispatch();
  const { data: presensiData, loading: presensiLoading } = useSelector(
    (state) => state.presensi
  );
  const navigate = useNavigate();
  // State untuk menyimpan status presensi per siswa
  const [presensiForm, setPresensiForm] = useState({});
  console.log(presensiData);
  const fetchInitialData = () => {
    if (id_kelas && tanggal) {
      dispatch(fetchPresensiTanggal({ id_kelas, tanggal }));
    }
  };

  useEffect(() => {
    fetchInitialData();
    setPresensiForm({}); // Reset form setiap tanggal berubah
  }, [tanggal]);

  const handleChange = (userId, status) => {
    setPresensiForm((prev) => ({
      ...prev,
      [userId]: status,
    }));
  };

  const handleSubmit = async () => {
    const siswa = presensiData?.[0]?.siswa || [];

    const payload = siswa
      .filter((s) => presensiForm[s.id]) // hanya siswa yg ada input status
      .map((s) => ({
        user_id: s.id,
        kelas_id: parseInt(id_kelas),
        status: presensiForm[s.id],
        tanggal,
      }));

    if (payload.length === 0) {
      toast.warning("Harap isi minimal satu data presensi.");
      return;
    }

    try {
      const res = await dispatch(createPresensi(payload));
      if (!createPresensi.fulfilled.match(res)) {
        throw new Error("Gagal menyimpan");
      }

      toast.success("Presensi berhasil disimpan!");
      navigate("../");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan presensi.");
    }
  };

  const handlePrintPdf = () => {
    const siswa = presensiData?.[0]?.siswa || [];

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Rekap Presensi Kelas: ${presensiData[0]?.kelas}`, 14, 15);
    doc.text(`Tanggal: ${tanggal}`, 14, 25);

    const tableData = siswa.map((s, i) => {
      const status =
        presensiForm[s.id] ||
        s.presensi?.find((p) => p.tanggal === tanggal)?.status ||
        "Belum Diisi";

      return [i + 1, s.name, status];
    });

    autoTable(doc, {
      head: [["No", "Nama Siswa", "Status"]],
      body: tableData,
      startY: 35,
    });

    doc.save(`rekap-presensi-${tanggal}.pdf`);
  };

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
            <div>
              <input
                type="date"
                className="input input-neutral cursor-pointer"
                value={tanggal || ""}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
          </section>
          {tanggal ? (
            <section className="mt-4">
              <div className="overflow-x-auto shadow">
                <table className="table table-zebra border-gray-400">
                  <thead>
                    <tr>
                      <th className="w-12">No</th>
                      <th>Nama Siswa</th>
                      <th>Hadir</th>
                      <th>Alpa</th>
                      <th>Izin</th>
                      <th>Sakit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presensiData?.[0]?.siswa.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        {["HADIR", "ALPA", "IZIN", "SAKIT"].map((status) => (
                          <td key={status}>
                            <input
                              type="radio"
                              name={`radio-${item.id}`}
                              className="radio"
                              value={status}
                              defaultChecked={
                                presensiForm[item.id] === status ||
                                item.presensi?.filter(
                                  (e) => e.tanggal === tanggal
                                )[0]?.status === status
                              }
                              onChange={() => handleChange(item.id, status)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="btn btn-outline" onClick={handlePrintPdf}>Print</button>

                {presensiData?.[0]?.siswa?.some((s) =>
                  s.presensi?.some((p) => p.tanggal === tanggal)
                ) ? (
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Update Presensi
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit Presensi
                  </button>
                )}
              </div>
            </section>
          ) : (
            <section className="flex flex-col justify-center items-center h-[20vh]">
              <span className="text-xl text-red-500">Pilih Tanggal</span>
              <p>Harap pilih tanggal untuk melihat data presensi siswa.</p>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default CreatePresensiPage;
