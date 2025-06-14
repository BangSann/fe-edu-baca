import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import AdminLayout from "../../../layout";
import { Link } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import DialogSoalLiterasi from "./components/dialogSoalLiterasi";
import Pagination from "../../../components/pagination";

const SoalLiterasiPage = () => {
  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  let [action, setAction] = useState("");
  // Dialog state
  return (
    <AdminLayout>
      <section className="space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center w-2/5">
            <Link to={"../"} className="btn btn-outline rounded-e-none">
              <GrFormPrevious />
            </Link>
            <input placeholder="search" className="input rounded-none" />
            <button className="btn btn-outline rounded-s-none">Clear</button>
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
              {[1, 2, 3, 4].map((item, i) => (
                <tr key={i}>
                  <th>{item}</th>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    pariatur quos aspernatur cum similique enim recusandae
                    labore deleniti delectus temporibus.
                  </td>
                  <td>Berita CNN Terbaru</td>
                  <td className="bg-green-200">Lorem ipsum dolor sit amet.</td>
                  <td>Lorem ipsum dolor sit amet consectetur.</td>
                  <td>Lorem ipsum dolor sit amet, consectetur adipisicing.</td>
                  <td>Lorem ipsum dolor sit.</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </td>
                  <td>10</td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-sm btn-primary text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("show");
                        setSelectedData({});
                      }}
                    >
                      <BsEye size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("delete");
                        setSelectedData({});
                      }}
                    >
                      <BiTrash size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => {
                        setIsOpen(true);
                        setAction("edit");
                        setSelectedData({});
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
      <DialogSoalLiterasi
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedData={selectedData}
        action={action}
      />
    </AdminLayout>
  );
};

export default SoalLiterasiPage;
