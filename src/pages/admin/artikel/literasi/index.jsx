import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSoalLiterasiByIdArtikel } from "../../../../lib/redux/slice/soalLiterasiSlice";
import { getnilaiLiterasiByIdArtikel } from "../../../../lib/redux/slice/nilaiLiterasiSlice";

const LiterasiPage = () => {
  const { id_artikel } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { data: dataSoal, isLoading: loadingSoal } = useSelector(
    (state) => state.soalLiterasi
  );
  const { data: dataNilai, isLoading: loadingNilai } = useSelector(
    (state) => state.nilaiLiterasi
  );
  // redux state

  useEffect(() => {
    async function handleGetSoalByIdArtikel() {
      try {
        const res = await dispatch(getSoalLiterasiByIdArtikel(id_artikel));
        if (!getSoalLiterasiByIdArtikel.fulfilled.match(res)) {
          console.log("failed get artikel data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function handleGetNilaiByIdArtikel() {
      try {
        const res = await dispatch(getnilaiLiterasiByIdArtikel(id_artikel));
        if (!getnilaiLiterasiByIdArtikel.fulfilled.match(res)) {
          console.log("failed get artikel data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleGetNilaiByIdArtikel();
    handleGetSoalByIdArtikel();
  }, []);
  return (
    <AdminLayout>
      <section>
        <Link to={"../"} className="flex items-center gap-2 mb-3">
          <GrFormPrevious size={24} />
          <h1 className="text-xl">Literasi</h1>
        </Link>
      </section>
      {loadingSoal || loadingNilai ? (
        <div className="skeleton h-32 w-full mt-3"></div>
      ) : (
        <section className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-md border space-y-3">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-xl font-semibold">Jumlah Soal</h1>
              <Link to={"soal"}>
                <FaExternalLinkAlt size={20} />
              </Link>
            </div>
            <h1 className="text-4xl font-semibold">
              {dataSoal?.[0]?.soal?.length}
            </h1>
          </div>
          <div className="p-4 rounded-md border space-y-3">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-xl font-semibold">Total Peserta</h1>
              <Link to={"nilai"}>
                <FaExternalLinkAlt size={20} />
              </Link>
            </div>
            <h1 className="text-4xl font-semibold">
              {dataNilai?.nilai?.length}
            </h1>
          </div>
        </section>
      )}
    </AdminLayout>
  );
};

export default LiterasiPage;
