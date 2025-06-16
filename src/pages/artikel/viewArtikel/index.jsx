import { useParams } from "react-router-dom";
import MainLayout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelById } from "../../../lib/redux/slice/artikelAdminSlice";
import { useEffect } from "react";
import ArtikelQuizLiterasi from "./artikelQuizLiterasi";
import { getCookies } from "cookies-next";
import ArtikelDebat from "./debatArtikel";

const ViewArtikelUsersPage = () => {
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
    <MainLayout>
      {isLoading ? (
        <section className=" flex justify-center">
          <div className="skeleton h-32 w-full container mt-3"></div>
        </section>
      ) : (
        <section>
          {dataArtikel?.[0]?.type == "quiz" ? (
            <ArtikelQuizLiterasi dataArtikel={dataArtikel[0]} />
          ) : (
            <ArtikelDebat dataArtikel={dataArtikel[0]} />
          )}
        </section>
      )}
    </MainLayout>
  );
};

export default ViewArtikelUsersPage;
