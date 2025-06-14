import { Link } from "react-router-dom";
import AdminLayout from "../../layout";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiArrowToLeft } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";

const LiterasiPage = () => {
  return (
    <AdminLayout>
      <section>
        <Link to={"../"} className="flex items-center gap-2 mb-3">
          <GrFormPrevious size={24} />
          <h1 className="text-xl">Literasi</h1>
        </Link>
      </section>
      <section className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-md bg-amber-100 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Soal</h1>
          <Link to={"soal"}>
            <FaExternalLinkAlt size={24} />
          </Link>
        </div>
        <div className="p-4 rounded-md bg-amber-100 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Nilai</h1>
          <Link to={"nilai"}>
            <FaExternalLinkAlt size={24} />
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
};

export default LiterasiPage;
