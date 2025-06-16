import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import { BsEye } from "react-icons/bs";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import DeleteArtikel from "./deleteArtikel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelDataAdmin } from "../../../lib/redux/slice/artikelAdminSlice";

const ArtikelAdminPage = () => {
  const navigate = useNavigate();

  // data state
  const dispatch = useDispatch();
  const { data: dataArtikel, isLoading } = useSelector(
    (state) => state.artikelAdmin
  );

  useEffect(() => {
    async function handleGetArtikelData() {
      try {
        const res = await dispatch(getArtikelDataAdmin());
        if (!getArtikelDataAdmin.fulfilled.match(res)) {
          console.log("failed get artikel data");
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleGetArtikelData();
  }, []);
  // data state

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 4;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataArtikel?.filter((item) =>
    item?.judul?.toLowerCase().includes(searchParams?.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

  // modal delete state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // modal delete state
  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <input
            placeholder="search"
            className="input rounded-e-none"
            onChange={(e) => setSearchParams(e.target.value)}
          />
          <button className="btn btn-outline rounded-s-none">Clear</button>
        </div>
        <button
          className="btn btn-secondary text-lg"
          onClick={() => navigate("add")}
          disabled={isLoading}
        >
          <BiPlus size={24} /> Tambah Artikel
        </button>
      </div>
      {isLoading ? (
        <div className="skeleton h-32 w-full mt-3"></div>
      ) : (
        <section className="mt-3">
          <div className="overflow-x-auto">
            <table className="table table-zebra border-gray-400">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-12">No</th>
                  <th>Artikel</th>
                  <th>Link</th>
                  <th>Type</th>
                  <th>Total Soal</th>
                  <th className="w-44">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {dataArtikel?.map((item, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask rounded-lg h-24 w-24">
                            <img
                              src={`${import.meta.env.VITE_API_IMAGE_DEV}${item?.image}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item?.judul}</div>
                          <div className="text-sm opacity-50">{item?.type}</div>
                        </div>
                      </div>
                    </td>

                    <td>{item?.artikel_link || ""}</td>
                    <td>{item?.type}</td>
                    <td>{item?.soal?.length || "0"}</td>
                    <td className="space-x-1">
                      <button
                        className="btn btn-sm btn-primary text-white"
                        onClick={() => navigate(`view/${item?.id}`)}
                      >
                        <BsEye size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedData(item);
                        }}
                      >
                        <BiTrash size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-success text-white"
                        onClick={() => navigate(`edit/${item?.id}`)}
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

      <DeleteArtikel
        isOpen={isOpen}
        selectedData={selectedData}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </AdminLayout>
  );
};

export default ArtikelAdminPage;
