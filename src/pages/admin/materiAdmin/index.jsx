import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layout";
import { getMateri } from "../../../lib/redux/slice/materiSlice";
import { useEffect, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import Pagination from "../components/pagination";
import DialogMateri from "./components/dialog";
import { useNavigate } from "react-router-dom";

const MateriAdminPage = () => {
  const navigate = useNavigate();
  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: materiData } = useSelector((state) => state.materi);
  // redux state

  useEffect(() => {
    async function handleGeMateri() {
      try {
        const res = await dispatch(getMateri());
        if (!getMateri.fulfilled.match(res)) {
          console.log("Gagal fetch:", res);
        }
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    }

    handleGeMateri();
  }, []);

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = materiData?.filter((item) =>
    item?.judul?.toLowerCase().includes(searchParams?.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

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
            <BiPlus size={24} /> Tambah Materi Siswa
          </button>
        </div>
        {isLoading ? (
          <div className="skeleton h-32 w-full mt-3"></div>
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
                            src={`${
                              import.meta.env.VITE_API_IMAGE_MATERI_DEV
                            }/${item?.cover}`}
                            alt={item.judul}
                            className="w-24"
                          />
                        </td>
                        <td>{item?.judul || ""}</td>

                        <td className="space-x-1">
                          <button
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => {
                              navigate(`/eduadmin/materi/${item?.id}`);
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
      <DialogMateri
        isOpen={isOpen}
        selectedData={selectedData}
        onClose={() => setIsOpen(false)}
        action={action}
      />
    </AdminLayout>
  );
};

export default MateriAdminPage;
