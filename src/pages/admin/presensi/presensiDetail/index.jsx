import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../layout";

import CreatePresensiPage from "./components/createPresensiPage";
import RekapPresensi from "./components/rekapPresensi";

const PresensiDetail = () => {
  const [searchParams] = useSearchParams();
  const tanggal = searchParams.get("tanggal");

  return (
    <AdminLayout>
      {tanggal ? <RekapPresensi tanggal={tanggal} /> : <CreatePresensiPage />}
    </AdminLayout>
  );
};

export default PresensiDetail;
