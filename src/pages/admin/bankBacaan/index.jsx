import { BsEye, BsPlus } from "react-icons/bs";
import AdminLayout from "../layout";
import Pagination from "../components/pagination";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DialogBacaan from "./components/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getBacaan } from "../../../lib/redux/slice/bacaanSlice";

const BankBacaanAmdinPage = () => {
  const navigate = useNavigate();

  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: dataBacaan } = useSelector((state) => state.bacaan);
  useEffect(() => {
    async function handleGetBacaan() {
      dispatch(getBacaan());
    }
    handleGetBacaan();
  }, []);
  // redux state

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataBacaan?.filter((item) =>
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
      <section className="flex justify-between space-y-3">
        <div className="flex w-2/5">
          <input
            type="search"
            className="input input-neutral w-full bg-white rounded-e-none"
            onChange={(e) => setSearchParams(e.target.value)}
            value={searchParams}
          />
          <button
            className="btn btn-outline rounded-s-none"
            onClick={() => setSearchParams("")}
          >
            Bersihkan
          </button>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsOpen(true);
            setAction("add");
          }}
        >
          <BsPlus size={24} /> Tambah Data Bacaan
        </button>
      </section>
      {isLoading ? (
        <section className="skeleton w-full h-32"></section>
      ) : currentDatas?.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-md">
          <p className="text-xl font-bold text-red-500 mb-4">
            Bacaan Tidak Ditemukan
          </p>
        </div>
      ) : (
        <section>
          <section className="">
            <div className="overflow-x-auto">
              <table className="table table-zebra border-gray-400">
                {/* head */}
                <thead>
                  <tr>
                    <th className="w-12">No</th>
                    <th>Cover</th>
                    <th>Judul</th>
                    <th className="w-44">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDatas?.map((item, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>
                        <img
                          className="w-24 h-24 object-cover"
                          src={`${import.meta.env.VITE_API_IMAGE_BACAAN_DEV}/${
                            item?.cover
                          }`}
                        />
                      </td>
                      <td>{item?.judul || ""}</td>
                      <td className="space-x-1">
                        <button
                          className="btn btn-sm btn-primary text-white"
                          onClick={() => {
                            navigate(`/eduadmin/bacaan/${item?.id}`);
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
      <DialogBacaan
        selectedData={selectedData}
        action={action}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </AdminLayout>
  );
};

export default BankBacaanAmdinPage;
