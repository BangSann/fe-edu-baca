import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout";

const ViewArtikelPage = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <section className="mb-3 flex w-full gap-2 justify-between items-center">
        <h1 className="text-lg font-semibold">Detail Data Artikel</h1>
      </section>
      <section className="grid grid-cols-3 gap-3">
        <section className="col-span-2 bg-gray-200 h-[80vh]">
          <iframe src={""} width="100%" height={"100%"} className="z-10" />
        </section>
        <section className="space-y-3">
          <div className="grid grid-cols-3 items-center">
            <p className="col-span-1 p-2">Judul</p>
            <p className="col-span-2 p-2 bg-slate-100">
              {"Berita CNN Terbaru"}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center">
            <p className="col-span-1 p-2">Type</p>
            <p className="col-span-2 p-2 bg-slate-100">{"Quiz"}</p>
          </div>
          <div className="grid grid-cols-3">
            <p className="col-span-1 p-2">Deskripsi</p>
            <p className="col-span-2 p-2 bg-slate-100">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              excepturi est officiis aut nisi adipisci nemo mollitia molestias
              hic temporibus?
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-2">
            <button className="btn btn-info text-white w-full" onClick={() => navigate("literasi")}>
              Edu Literasi
            </button>
            <button className="btn btn-primary w-full" onClick={() => navigate("../")}>
              Kembali
            </button>
          </div>
        </section>
      </section>
    </AdminLayout>
  );
};

export default ViewArtikelPage;
