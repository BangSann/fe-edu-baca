import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import { BsEye } from "react-icons/bs";
import Pagination from "../components/pagination";
import UsersDialog from "./components/dialog/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersDataAdmin } from "../../../lib/redux/slice/usersAdminSlice";
import { toast } from "react-toastify";
import { getDataKelas } from "../../../lib/redux/slice/kelasAdminSlice";
import { getDataSekolah } from "../../../lib/redux/slice/sekolahAdminSlice";

const UsersAdminPage = () => {
  // users state
  const dispatch = useDispatch();
  const { isLoading: usersLoading, data: usersAdminData } = useSelector(
    (state) => state.usersAdmin
  );
  const { isLoading: kelasLoading } = useSelector((state) => state.kelasAdmin);
  const { isLoading: sekolahLoading } = useSelector(
    (state) => state.sekolahAdmin
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, sekolahRes, kelasRes] = await Promise.all([
          dispatch(getUsersDataAdmin()),
          dispatch(getDataSekolah()),
          dispatch(getDataKelas()),
        ]);

        if (!getUsersDataAdmin.fulfilled.match(usersRes)) {
          toast.error("Gagal mengambil data pengguna");
        }
        if (!getDataSekolah.fulfilled.match(sekolahRes)) {
          toast.error("Gagal mengambil data sekolah");
        }
        if (!getDataKelas.fulfilled.match(kelasRes)) {
          toast.error("Gagal mengambil data kelas");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Terjadi kesalahan saat mengambil data admin.");
      }
    };

    fetchAllData();
  }, []);

  // users state

  // filter state
  const [searchParams, setSearchParams] = useState("");

  // const filteredData = usersAdminData.filter((item) =>
  //   item.username.toLowerCase().includes(searchParams.toLowerCase())
  // );
  // filter state

  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // dialog state
  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <input
            placeholder="search"
            className="input rounded-e-none"
            onChange={(e) => setSearchParams(e.target.value)}
            value={searchParams}
          />
          <button className="btn btn-outline rounded-s-none">Clear</button>
        </div>
        <button
          className="btn btn-secondary text-lg"
          onClick={() => {
            setIsOpen(true);
            setAction("add");
          }}
          disabled={usersLoading || kelasLoading || sekolahLoading}
        >
          <BiPlus size={24} /> Tambah Pengguna
        </button>
      </div>
      {usersLoading || kelasLoading || sekolahLoading ? (
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
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Sekolah</th>
                    <th>Kelas</th>
                    <th className="w-44">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {usersAdminData?.map((item, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{item?.name || ""}</td>
                      <td>{item?.username || ""}</td>
                      <td>{item?.email || ""}</td>
                      <td>{item?.sekolah?.nama_sekolah || ""}</td>
                      <td>{item?.kelas.kelas || ""}</td>
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
              dataLength={17}
              dataShowCount={5}
              setDataShowItems={(e) => console.log(e)}
            />
          </section>
        </section>
      )}
      <UsersDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
        action={action}
      />
    </AdminLayout>
  );
};

export default UsersAdminPage;
