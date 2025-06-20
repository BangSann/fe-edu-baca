import { useParams } from "react-router-dom";
import MainLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelById } from "../../../lib/redux/slice/artikelAdminSlice";
import { useEffect, useState } from "react";
import ArtikelQuizLiterasi from "./artikelQuizLiterasi";
import { getCookies } from "cookies-next";
import ArtikelDebat from "./debatArtikel";
import { getNilaiLiterasiByIdUsersIdArtikel } from "../../../lib/redux/slice/nilaiLiterasiSlice";

const ViewArtikelUsersPage = () => {
  const { id_artikel } = useParams();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // data state
  const dispatch = useDispatch();
  const { data: dataArtikel, isLoading } = useSelector(
    (state) => state.artikelAdmin
  );
  const { isLoading: loadingNilai, data: dataNilai } = useSelector(
    (state) => state.nilaiLiterasi
  );
  const { data: dataProfile } = useSelector((state) => state.auth);

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

  useEffect(() => {
    dispatch(
      getNilaiLiterasiByIdUsersIdArtikel({
        id_user: dataProfile?.id,
        id_artikel,
      })
    );
  }, []);

  return (
    <MainLayout>
      <section className="mx-auto h-[95vh]">
        {isLoading || loadingNilai ? (
          <section className=" flex justify-center p-4">
            <div className="skeleton h-32 w-full container mt-3"></div>
          </section>
        ) : quizSubmitted ? (
          <section></section>
        ) : (
          <section>
            {dataArtikel?.[0]?.type == "quiz" ? (
              <ArtikelQuizLiterasi
                dataArtikel={dataArtikel[0]}
                setQuizSubmitted={(e) => setQuizSubmitted(e)}
              />
            ) : (
              <ArtikelDebat dataArtikel={dataArtikel[0]} />
            )}
          </section>
        )}
      </section>
    </MainLayout>
  );
};

export default ViewArtikelUsersPage;
