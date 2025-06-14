import { Link } from "react-router-dom";
import AdminLayout from "./layout";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <section className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-blue-200 flex justify-between items-center rounded-md">
          <h1 className="text-xl font-semibold">Sekolah</h1>
          <Link to={"sekolah"}>
            <LiaExternalLinkSquareAltSolid size={24}/>
          </Link>
        </div>
        <div className="p-4 bg-blue-200 flex justify-between items-center rounded-md">
          <h1 className="text-xl font-semibold">Kelas</h1>
          <Link to={"kelas"}>
            <LiaExternalLinkSquareAltSolid size={24}/>
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
