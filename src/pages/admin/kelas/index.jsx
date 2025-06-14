import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import Pagination from "../components/pagination";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const KelasAdminPage = () => {
  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // dialog state
  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <Link to={"../"} className="btn btn-outline rounded-e-none">
            <GrFormPrevious />
          </Link>
          <input placeholder="search" className="input rounded-none" />
          <button className="btn btn-outline rounded-s-none">Clear</button>
        </div>
      </div>
      <section className="mt-3">
        <div className="overflow-x-auto">
          <table className="table table-zebra border-gray-400">
            {/* head */}
            <thead>
              <tr>
                <th className="w-12">No</th>
                <th>Nama Kelas</th>
                <th>Nama Sekolah</th>
                <th>Jumlah Siswa</th>
                <th className="w-44">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {[1, 2, 3, 4].map((item, i) => (
                <tr key={i}>
                  <th>{item}</th>
                  <td>1C</td>
                  <td>SDN 5</td>
                  <td>30</td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-sm btn-primary text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("show");
                        // setSelectedData = {};
                      }}
                    >
                      <BsEye size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("delete");
                        // setSelectedData = {};
                      }}
                    >
                      <BiTrash size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("edit");
                        // setSelectedData = {};
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
    </AdminLayout>
  );
};

export default KelasAdminPage;
