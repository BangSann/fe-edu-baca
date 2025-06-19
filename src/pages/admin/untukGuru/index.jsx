import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layout";
import { getPerangkatMateri } from "../../../lib/redux/slice/perangkatMateriSlice";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import DialogModulGuru from "./components/dialog";
import { useNavigate } from "react-router-dom";

const PerangkatMateriAdminPage = () => {
  const navigate = useNavigate();
  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: perangkatMateriData } = useSelector(
    (state) => state.perangkatMateri
  );
  // redux state
  useEffect(() => {
    async function handleGetPerangkatMateri() {
      try {
        const res = await dispatch(getPerangkatMateri());
        if (!getPerangkatMateri.fulfilled.match(res)) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleGetPerangkatMateri();
  }, []);

  // Filter & Pagination
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = perangkatMateriData?.filter((item) =>
    item?.judul?.toLowerCase().includes(searchParams?.toLowerCase())
  );

  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // Filter & Pagination

  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // dialog state
  return (
    <AdminLayout>
      <section>
        <div className="flex justify-between">
          <div className="flex items-center w-2/5">
            <input
              placeholder="search"
              className="input rounded-e-none"
              onChange={(e) => setSearchParams(e.target.value)}
              value={searchParams}
            />
            <button
              className="btn btn-outline rounded-s-none"
              onClick={() => setSearchParams("")}
            >
              Clear
            </button>
          </div>
          <button
            className="btn btn-secondary text-lg"
            onClick={() => {
              setIsOpen(true);
              setAction("add");
            }}
            disabled={isLoading}
          >
            <BiPlus size={24} /> Tambah Modul Guru
          </button>
        </div>
        {isLoading ? (
          <div className="skeleton h-32 w-full mt-3"></div>
        ) : currentDatas?.length <= 0 ? (
          <section>
            <div className="alert alert-warning mt-3">
              <span>Modul tidak ditemukan</span>
            </div>
          </section>
        ) : (
          <section>
            <section className="mt-3">
              <div className="overflow-x-auto">
                <table className="table table-zebra border-gray-400">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="w-12">No</th>
                      <th>Cover</th>
                      <th>Judul</th>
                      <th className="w-44">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {currentDatas?.map((item, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>
                          <img
                            src={`${import.meta.env.VITE_API_IMAGE_MODUL_DEV}/${
                              item?.cover
                            }`}
                            alt={item.judul}
                            className="w-24"
                          />
                        </td>
                        <td>{item?.judul || ""}</td>

                        <td className="space-x-1">
                          <button
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => {
                              navigate(
                                `/eduadmin/perangkat-materi/${item?.id}`
                              );
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
          </section>
        )}
      </section>
      <DialogModulGuru
        action={action}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
      />
    </AdminLayout>
  );
};

export default PerangkatMateriAdminPage;
