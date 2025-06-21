import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layout";
import { GrFormPrevious } from "react-icons/gr";

const ViewBacaanUserPage = () => {
  const { id_bacaan } = useParams();

  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: dataBacaan } = useSelector((state) => state.bacaan);
  useEffect(() => {
    async function handleGetBacaan() {
      dispatch(getBacaanById(id_bacaan));
    }
    handleGetBacaan();
  }, []);
  // redux state
  console.log(dataBacaan);

  const [pdfLoaded, setPdfLoaded] = useState(false);

  const handleLoad = () => {
    setPdfLoaded(true);
  };

  const handleError = () => {
    setPdfLoaded(false);
  };
  return (
    <MainLayout>
      <section className="mx-auto container px-3 mt-3 min-h-[calc(100vh-65px)]">
        {isLoading ? (
          <section className="skeleton h-34 w-full"></section>
        ) : (
          <section className="space-y-3">
            <section className="flex w-full  items-center">
              <Link to={"../"} className="btn btn-outline rounded-e-none">
                <GrFormPrevious />
              </Link>
              <h1 className="input input-neutral rounded-s-none w-full bg-gray-300">
                {"Judul Tidak Tersedia"}
              </h1>
            </section>
            <div className="w-full overflow-hidden">
              <div className="w-full h-[80vh] rounded-xl border border-gray-300 shadow-md overflow-hidden relative bg-gray-100">
                {!pdfLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <span className="loading loading-spinner loading-lg text-gray-600"></span>
                  </div>
                )}
                {true ? (
                  <iframe
                    src={`/dummy_materi.pdf`}
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

export default ViewBacaanUserPage;
