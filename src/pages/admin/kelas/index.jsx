import { BiEdit, BiPen, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import Pagination from "../components/pagination";
import { BsEye, BsPerson } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataKelasByIdSekolah } from "../../../lib/redux/slice/kelasAdminSlice";
import { toast } from "react-toastify";
import DialogKelas from "./components/dialog";

const KelasAdminPage = () => {
  const { id_sekolah } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { data: dataKelas, isLoading: sekolahLoading } = useSelector(
    (state) => state.kelasAdmin
  );
  async function handleGetKelas() {
    try {
      const res = await dispatch(getDataKelasByIdSekolah(id_sekolah));
      if (!getDataKelasByIdSekolah.fulfilled.match(res)) {
        toast.error("gagal mendapatkan data kelas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetKelas();
  }, [id_sekolah]);
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

  const filteredData = dataKelas?.kelas?.filter((item) =>
    item.kelas.toLowerCase().includes(searchParams.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-full">
          <Link to={"../"} className="btn btn-outline rounded-e-none">
            <GrFormPrevious />
          </Link>
          <div className="input text-center w-full bg-gray-300 px-2">
            {dataKelas?.nama_sekolah | ""}
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between items-center">
        <div className="flex items-center w-2/5">
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

        <button
          className="btn btn-secondary"
          onClick={() => {
            setIsOpen(true);
            setAction("add");
          }}
          disabled={sekolahLoading}
        >
          <BiPlus size={24} />
          Tambah Kelas
        </button>
      </div>
      <section className="mt-3">
        {sekolahLoading ? (
          <div className="skeleton h-32 w-full mt-3"></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              {/* row 1 */}
              <div className="grid grid-cols-2 gap-3">
                {currentDatas?.map((item, i) => (
                  <div className="card shadow-md border" key={i}>
                    <div className="card-body">
                      <div className="w-full flex justify-between">
                        <h1 className="card-title text-2xl">
                          {item?.kelas || ""}
                        </h1>
                        <div className="flex gap-1 items-center justify-center">
                          <BiTrash
                            size={24}
                            onClick={() => {
                              setIsOpen(true);
                              setAction("delete");
                              setSelectedData(item);
                            }}
                          />
                          <BiEdit
                            size={24}
                            onClick={() => {
                              setIsOpen(true);
                              setAction("edit");
                              setSelectedData(item);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-center justify-start mt-4">
                        <BsPerson size={24} />
                        <p className="text-xl font-semibold">
                          {item?.siswa?.length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              dataLength={filteredData?.length}
              dataShowCount={showDataIndex}
              setDataShowItems={(e) => setDataShowItems(e)}
            />
          </>
        )}
      </section>
      <DialogKelas
        action={action}
        getKelasAction={() => handleGetKelas()}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
      />
    </AdminLayout>
  );
};

export default KelasAdminPage;
