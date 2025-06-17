import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { getMateriById } from "../../../lib/redux/slice/materiSlice";
import { useEffect } from "react";
import PDFViewer from "../../../components/pdfViewer";
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

  const pdfURL = materiData[0]?.pdf || "/dummy_materi.pdf"; // Gunakan dummy jika tidak tersedia

  return (
    <MainLayout>
      <section className="container mx-auto px-4 py-6">
        {isLoading ? (
          <section className="skeleton h-34 w-full"></section>
        ) : (
          <section className="space-y-3">
            <section className="flex w-full  items-center">
              <Link to={"../"} className="btn btn-outline rounded-e-none">
                <GrFormPrevious />
              </Link>
              <h1 className="input input-neutral rounded-s-none w-full bg-gray-300">
                {materiData[0]?.judul || "Judul Tidak Tersedia"}
              </h1>
            </section>
            <div className="w-full h-[80vh] border rounded shadow overflow-hidden">
              <PDFViewer fileUrl={pdfURL} />
            </div>
          </section>
        )}
      </section>
    </MainLayout>
  );
};

export default ViewUsersMateri;
