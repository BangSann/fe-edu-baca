import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataSekolah } from "../../../lib/redux/slice/sekolahAdminSlice";
import { toast } from "react-toastify";
import Pagination from "../components/pagination";
import DialogSekolah from "./components/dialog";

const SekolahAdminPage = () => {
  const navigate = useNavigate();
  // redux state
  const dispatch = useDispatch();
  const { data: dataSekolah, isLoading: sekolahLoading } = useSelector(
    (state) => state.sekolahAdmin
  );

  const fetchAllData = async () => {
    try {
      const [sekolahRes] = await Promise.all([dispatch(getDataSekolah())]);

      if (!getDataSekolah.fulfilled.match(sekolahRes)) {
        toast.error("Gagal mengambil data sekolah");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Terjadi kesalahan saat mengambil data admin.");
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);
  // redux state

  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // dialog state

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataSekolah?.filter((item) =>
    item?.nama_sekolah?.toLowerCase()?.includes(searchParams?.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <Link to={"../"} className="btn btn-outline rounded-e-none">
            <GrFormPrevious />
          </Link>
          <input
            placeholder="cari"
            className="input rounded-none"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
          <button
            className="btn btn-outline rounded-s-none"
            onClick={() => setSearchParams("")}
          >
            Bersihkan
          </button>
        </div>
        <button
          className="btn btn-secondary text-lg"
          onClick={() => {
            setIsOpen(true);
            setAction("add");
          }}
          disabled={sekolahLoading}
        >
          <BiPlus size={24} /> Tambah Sekolah
        </button>
      </div>
      {sekolahLoading ? (
        <div className="skeleton h-32 w-full mt-3"></div>
      ) : currentDatas?.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-md mt-3">
          <p className="text-xl font-bold text-red-500 mb-4">
            Data Soal Tidak Ditemukan
          </p>
        </div>
      ) : (
        <section className="mt-3">
          <div className="overflow-x-auto">
            <table className="table table-zebra border-gray-400">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-12">No</th>
                  <th>Nama Sekolah</th>
                  <th>Jumlah Kelas</th>
                  <th className="w-44">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {currentDatas?.map((item, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{item?.nama_sekolah}</td>
                    <td>{item?.kelas?.length || 0}</td>
                    <td className="space-x-1">
                      <button
                        className="btn btn-sm btn-primary text-white"
                        onClick={() => {
                          navigate(`${item?.id}/kelas`);
                        }}
                      >
                        <BsEye size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => {
                          setIsOpen(true);
                          setAction("delete");
                          setSelectedData(item);
                        }}
                      >
                        <BiTrash size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-success text-white"
                        onClick={() => {
                          setIsOpen(true);
                          setAction("edit");
                          setSelectedData(item);
                        }}
                      >
                        <BiEdit size={18} />
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
        </section>
      )}

      <DialogSekolah
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
        action={action}
        getSekolahAction={() => fetchAllData()}
      />
    </AdminLayout>
  );
};

export default SekolahAdminPage;
