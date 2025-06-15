import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../../../layout";
import { Link, useParams } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import DialogSoalLiterasi from "./components/dialogSoalLiterasi";
import Pagination from "../../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getSoalLiterasiByIdArtikel } from "../../../../../lib/redux/slice/soalLiterasiSlice";

const SoalLiterasiPage = () => {
  const { id_artikel } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { data: dataSoal, isLoading: loadingSoal } = useSelector(
    (state) => state.soalLiterasi
  );
  async function handleGetSoalByIdArtikel() {
    try {
      const res = await dispatch(getSoalLiterasiByIdArtikel(id_artikel));
      if (!getSoalLiterasiByIdArtikel.fulfilled.match(res)) {
        console.log("failed get artikel data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetSoalByIdArtikel();
  }, [id_artikel]);
  // redux state

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // Dialog state

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 5;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataSoal?.[0]?.soal?.filter((item) =>
    item?.soal?.toLowerCase().includes(searchParams?.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state
  return (
    <AdminLayout>
      <section className="space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center w-2/5">
            <Link to={"../"} className="btn btn-outline rounded-e-none">
              <GrFormPrevious />
            </Link>
            <input
              placeholder="search"
              className="input rounded-none"
              onChange={(e) => setSearchParams(e.target.value)}
              value={searchParams}
            />
            <button className="btn btn-outline rounded-s-none" onClick={()=>setSearchParams('')}>Clear</button>
          </div>
          <button
            className="btn btn-secondary text-lg"
            onClick={() => {
              setIsOpen(true);
              setAction("add");
            }}
          >
            <BiPlus size={24} /> Tambah Soal
          </button>
        </div>
        {loadingSoal ? (
          <div className="skeleton h-32 w-full mt-3"></div>
        ) : currentDatas?.length <= 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-md">
            <p className="text-xl font-bold text-red-500 mb-4">
              Data Soal Tidak Ditemukan
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra border-gray-400">
                {/* head */}
                <thead>
                  <tr>
                    <th className="w-12">No</th>
                    <th>Soal</th>
                    <th>Artikel</th>
                    <th>Opsi A</th>
                    <th>Opsi B</th>
                    <th>Opsi C</th>
                    <th>Opsi D</th>
                    <th>Opsi E</th>
                    <th>Score</th>
                    <th className="w-44">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {currentDatas?.map((item, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{item?.soal || "undefined"}</td>
                      <td>{dataSoal?.[0]?.judul}</td>
                      <td
                        className={`${
                          item?.opsi_a == item?.jawaban && "bg-green-300"
                        }`}
                      >
                        {item?.opsi_a || "undefined"}
                      </td>
                      <td
                        className={`${
                          item?.opsi_b == item?.jawaban && "bg-green-300"
                        }`}
                      >
                        {item?.opsi_b || "undefined"}
                      </td>
                      <td
                        className={`${
                          item?.opsi_c == item?.jawaban && "bg-green-300"
                        }`}
                      >
                        {item?.opsi_c || "undefined"}
                      </td>
                      <td
                        className={`${
                          item?.opsi_d == item?.jawaban && "bg-green-300"
                        }`}
                      >
                        {item?.opsi_d || "undefined"}
                      </td>
                      <td
                        className={`${
                          item?.opsi_e == item?.jawaban && "bg-green-300"
                        }`}
                      >
                        {item?.opsi_e || "undefined"}
                      </td>
                      <td>{item?.score || "undefined"}</td>
                      <td className="space-x-1">
                        <button
                          className="btn btn-sm btn-primary text-white"
                          onClick={() => {
                            setIsOpen(true);
                            setAction("show");
                            setSelectedData(item);
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
          </>
        )}
      </section>
      <DialogSoalLiterasi
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
        action={action}
        getSoalAction={() => handleGetSoalByIdArtikel()}
      />
    </AdminLayout>
  );
};

export default SoalLiterasiPage;
