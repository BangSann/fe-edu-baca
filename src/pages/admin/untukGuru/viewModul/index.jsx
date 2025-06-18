import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMateriById } from "../../../../lib/redux/slice/materiSlice";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import AdminLayout from "../../layout";
import { getPerangkatMateriById } from "../../../../lib/redux/slice/perangkatMateriSlice";

const ViewModulAdminPage = () => {
  const { id_modul } = useParams();
  const [pdfLoaded, setPdfLoaded] = useState(false);

  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: perangkatMateriData } = useSelector(
    (state) => state.perangkatMateri
  );
  // redux state

  useEffect(() => {
    async function handleGetModul() {
      try {
        const res = await dispatch(getPerangkatMateriById(id_modul));
        if (!getPerangkatMateriById.fulfilled.match(res)) {
          console.error("Gagal fetch:", res);
        }
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    }

    handleGetModul();
  }, [id_modul]);

  const handleLoad = () => {
    setPdfLoaded(true);
  };

  const handleError = () => {
    setPdfLoaded(false);
  };

  return (
    <AdminLayout>
      <section className="mx-auto space-y-4">
        {isLoading ? (
          <section className="skeleton h-40 w-full rounded-xl"></section>
        ) : (
          <>
            <section className="flex items-center gap-2">
              <Link
                to="../"
                className="btn btn-outline rounded-lg flex items-center gap-1"
              >
                <GrFormPrevious />
                <span>Kembali</span>
              </Link>
              <h1 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-lg w-full">
                {perangkatMateriData[0]?.judul || "Judul Tidak Tersedia"}
              </h1>
            </section>

            <div className="w-full h-[80vh] rounded-xl border border-gray-300 shadow-md overflow-hidden relative bg-gray-100">
              {!pdfLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <span className="loading loading-spinner loading-lg text-gray-600"></span>
                </div>
              )}
              {perangkatMateriData[0]?.file ? (
                <iframe
                  src={`${import.meta.env.VITE_API_PDF_MODUL_DEV}${
                    perangkatMateriData[0].file
                  }`}
                  className="w-full h-full"
                  onLoad={handleLoad}
                  onError={handleError}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600 text-center px-4">
                  PDF tidak tersedia atau gagal dimuat.
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </AdminLayout>
  );
};

export default ViewModulAdminPage;
