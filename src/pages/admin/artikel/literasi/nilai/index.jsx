import { BiTrash } from "react-icons/bi";
import AdminLayout from "../../../layout";
import { Link } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { BsPrinter } from "react-icons/bs";
import Pagination from "../../../components/pagination";
import { useState } from "react";
import DeleteNilai from "./components/deleteNilai";

const NilaiLiterasiPage = () => {
  // modal delete state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // modal delete state
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
        <button className="btn btn-secondary text-lg" onClick={() => {}}>
          <BsPrinter size={24} /> Export Nilai
        </button>
      </div>
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
            {[1, 2, 3, 4].map((item, i) => (
              <tr key={i}>
                <th>{item}</th>
                <td>Alexa Budiono</td>
                <td>alexa123</td>
                <td>SDN 2</td>
                <td>5</td>
                <td>90</td>
                <td className="space-x-1">
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedData({});
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
        dataLength={17}
        dataShowCount={5}
        setDataShowItems={(e) => console.log(e)}
      />
      <DeleteNilai isOpen={isOpen} selectedData={selectedData} onClose={()=>setIsOpen(false)} />
    </AdminLayout>
  );
};

export default NilaiLiterasiPage;
