import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { getMateriById } from "../../../lib/redux/slice/materiSlice";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";

const ViewUsersMateri = () => {
  const { id_materi } = useParams();

  const dispatch = useDispatch();
  const { isLoading, data: materiData } = useSelector((state) => state.materi);

  useEffect(() => {
    async function handleGeMateri() {
      try {
        const res = await dispatch(getMateriById(id_materi));
        if (!getMateriById.fulfilled.match(res)) {
          console.error("Gagal fetch:", res);
        }
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    }

    handleGeMateri();
  }, [id_materi]);

  const [pdfLoaded, setPdfLoaded] = useState(false);

  const handleLoad = () => {
    setPdfLoaded(true);
  };

  const handleError = () => {
    setPdfLoaded(false);
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-4 py-6 min-h-[calc(100vh-65px)]">
        {isLoading ? (
          <section className="skeleton h-34 w-full"></section>
        ) : (
          <section className="space-y-3">
            <section className="flex w-full  items-center">
              <Link to={"../"} className="btn btn-outline rounded-e-none">
                <GrFormPrevious />
              </Link>
              <h1 className="input input-neutral rounded-s-none w-full bg-gray-300 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500">
                {materiData[0]?.judul || "Judul Tidak Tersedia"}
              </h1>
            </section>
            <div className="w-full h-[80vh] overflow-hidden">
              <div className="w-full h-[80vh] rounded-xl border border-gray-300 shadow-md overflow-hidden relative bg-gray-100">
                {!pdfLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <span className="loading loading-spinner loading-lg text-gray-600"></span>
                  </div>
                )}
                {materiData[0]?.pdf ? (
                  <iframe
                    src={`${import.meta.env.VITE_API_PDF_MATERI_DEV}${
                      materiData[0].pdf
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
            </div>
          </section>
        )}
      </section>
    </MainLayout>
  );
};

export default ViewUsersMateri;
