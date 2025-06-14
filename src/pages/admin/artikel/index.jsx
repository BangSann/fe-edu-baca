import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../layout";
import { BsEye } from "react-icons/bs";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import DeleteArtikel from "./deleteArtikel";
import { useState } from "react";

const ArtikelAdminPage = () => {
  const navigate = useNavigate();

  // modal delete state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // modal delete state
  return (
    <AdminLayout>
      <div className="flex justify-between">
        <div className="flex items-center w-2/5">
          <input placeholder="search" className="input rounded-e-none" />
          <button className="btn btn-outline rounded-s-none">Clear</button>
        </div>
        <button
          className="btn btn-secondary text-lg"
          onClick={() => navigate("add")}
        >
          <BiPlus size={24} /> Tambah Artikel
        </button>
      </div>
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
                <th>Total Score</th>
                <th className="w-44">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {[1, 2, 3, 4].map((item, i) => (
                <tr key={i}>
                  <th>{item}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded-lg h-24 w-24">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>

                  <td>https://img.daisyui.com/images/profile/demo/2@94.webp</td>
                  <td>Quiz</td>
                  <td>10</td>
                  <td>100</td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-sm btn-primary text-white"
                      onClick={() => navigate(`view/${"wyqu12y1usak1"}`)}
                    >
                      <BsEye size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedData({});
                      }}
                    >
                      <BiTrash size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => navigate(`edit/${"wyqu12y1usak1"}`)}
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
