import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelById } from "../../../../lib/redux/slice/artikelAdminSlice";
import { useEffect } from "react";

const ViewArtikelPage = () => {
  const navigate = useNavigate();
  const { id_artikel } = useParams();

  // data state
  const dispatch = useDispatch();
  const { data: dataArtikel, isLoading } = useSelector(
    (state) => state.artikelAdmin
  );

  useEffect(() => {
    async function handleGetArtikelData() {
      try {
        const res = await dispatch(getArtikelById(id_artikel));
        if (!getArtikelById.fulfilled.match(res)) {
          console.log("failed get artikel data");
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleGetArtikelData();
  }, [id_artikel]);
  // data state
  return (
    <AdminLayout>
      <section className="mb-3 flex w-full gap-2 justify-between items-center">
        <h1 className="text-lg font-semibold">Detail Data Artikel</h1>
      </section>
      {isLoading ? (
        <div className="skeleton h-32 w-full mt-3"></div>
      ) : (
        <>
          <section className="grid grid-cols-3 gap-3">
            <section className="col-span-2 bg-gray-200 h-[80vh]">
              <iframe
                src={dataArtikel[0]?.artikel_link}
                width="100%"
                height={"100%"}
                className="z-10"
              />
            </section>
            <section className="space-y-3">
              {dataArtikel[0]?.image && (
                <img
                  src={
                    import.meta.env.VITE_API_IMAGE_DEV + dataArtikel[0]?.image
                  }
                  alt="Preview"
                  className="w-full max-h-48 object-contain border rounded"
                />
              )}
              <div className="grid grid-cols-3 items-center">
                <p className="col-span-1 p-2">Judul</p>
                <p className="col-span-2 p-2 bg-slate-100">
                  {dataArtikel[0]?.judul}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center">
                <p className="col-span-1 p-2">Type</p>
                <p className="col-span-2 p-2 bg-slate-100">
                  {dataArtikel[0]?.type}
                </p>
              </div>
              <div className="grid grid-cols-3">
                <p className="col-span-1 p-2">Deskripsi</p>
                <p className="col-span-2 p-2 bg-slate-100">
                  {dataArtikel[0]?.deskripsi}
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-2">
                <button
                  className="btn btn-info text-white w-full"
                  onClick={() => navigate("literasi")}
                >
                  Edu Literasi
                </button>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate("../")}
                >
                  Kembali
                </button>
              </div>
            </section>
          </section>
        </>
      )}
    </AdminLayout>
  );
};

export default ViewArtikelPage;
