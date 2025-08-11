import { BiTrash } from "react-icons/bi";
import AdminLayout from "../../../layout";
import { Link, useParams } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { BsPrinter } from "react-icons/bs";
import Pagination from "../../../components/pagination";
import { useEffect, useState } from "react";
import DeleteNilai from "./components/deleteNilai";
import { useDispatch, useSelector } from "react-redux";
import { getnilaiLiterasiByIdArtikel } from "../../../../../lib/redux/slice/nilaiLiterasiSlice";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NilaiLiterasiPage = () => {
  const { id_artikel } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { data: dataNilai, isLoading: loadingNilai } = useSelector(
    (state) => state.nilaiLiterasi
  );
  // redux state
  async function handleGetNilaiByIdArtikel() {
    try {
      const res = await dispatch(getnilaiLiterasiByIdArtikel(id_artikel));
      if (!getnilaiLiterasiByIdArtikel.fulfilled.match(res)) {
        console.log("failed get artikel data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetNilaiByIdArtikel();
  }, []);
  // redux state

  // modal delete state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // modal delete state

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataNilai?.nilai?.filter(
    (item) =>
      item.user?.name?.toLowerCase().includes(searchParams.toLowerCase()) ||
      // item?.user?.sekolah?.nama_sekolah?.toLowerCase().includes(searchParams.toLowerCase()) ||
      item.user?.username?.toLowerCase().includes(searchParams.toLowerCase())
  );

  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Daftar Nilai Literasi", 14, 15);

    const tableData = filteredData.map((item, index) => [
      index + 1,
      item.user?.name || "-",
      item.user?.username || "-",
      item.user?.sekolah ? `SDN ${item.user.sekolah}` : "-",
      item.user?.kelas || "-",
      item.nilai,
    ]);

    autoTable(doc, {
      head: [["No", "Nama", "Username", "Sekolah", "Kelas", "Nilai"]],
      body: tableData,
      startY: 20,
    });

    doc.save("nilai-literasi.pdf");
  };

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <Link to={"../"} className="btn btn-outline rounded-e-none">
            <GrFormPrevious />
          </Link>
          <input
            placeholder="search"
            className="input rounded-none"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
          <button
            className="btn btn-outline rounded-s-none"
            onClick={() => setSearchParams("")}
          >
            Clear
          </button>
        </div>
        <button className="btn btn-secondary text-lg" onClick={handleExportPDF}>
          <BsPrinter size={24} /> Export Nilai
        </button>
      </div>
      {loadingNilai ? (
        <div className="skeleton h-32 w-full mt-3"></div>
      ) : currentDatas?.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-md mt-3">
          <p className="text-xl font-bold text-red-500 mb-4">
            Data Nilai Tidak Ditemukan
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mt-3">
            <table className="table table-zebra border-gray-400">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-12">No</th>
                  <th>Nama Siswa</th>
                  <th>Username</th>
                  <th>Sekolah</th>
                  <th>Kelas</th>
                  <th>Nilai</th>
                  <th className="w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {currentDatas?.map((item, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{item.user?.name || "-"}</td>
                    <td>{item.user?.username || "-"}</td>
                    <td>{item.user?.sekolah?.nama_sekolah || ""}</td>
                    <td>{item.user?.kelas || "-"}</td>
                    <td>{item.nilai}</td>
                    <td className="space-x-1">
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedData(item);
                        }}
                      >
                        <BiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            dataLength={filteredData?.length}
            dataShowCount={showDataIndex}
            setDataShowItems={(e) => setDataShowItems(e)}
          />
        </>
      )}

      <DeleteNilai
        isOpen={isOpen}
        selectedData={selectedData}
        onClose={() => setIsOpen(false)}
        getNilaiAction={() => handleGetNilaiByIdArtikel()}
      />
    </AdminLayout>
  );
};

export default NilaiLiterasiPage;
