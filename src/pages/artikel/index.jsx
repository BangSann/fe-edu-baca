import { useEffect } from "react";
import MainLayout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelDataAdmin } from "../../lib/redux/slice/artikelAdminSlice";
import { Link, useNavigate } from "react-router-dom";
import { getCookies } from "cookies-next";

const ArtikelPage = () => {
  const dispatch = useDispatch();
  const { data: dataArtikel, isLoading } = useSelector(
    (state) => state.artikelAdmin
  );
  useEffect(() => {
    async function handleGetArtikel() {
      try {
        const res = await dispatch(getArtikelDataAdmin());
        if (!getArtikelDataAdmin.fulfilled.match(res)) {
          console.log("failed get artikel data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleGetArtikel();
  }, []);

  const { reading_artikel_id } = getCookies();
  const navigate = useNavigate();

  if (reading_artikel_id) {
    return navigate(`/artikel/${reading_artikel_id}`);
  }

  return (
    <MainLayout>
      <section className="mt-4 flex justify-center">
        <h1 className="text-start text-xl font-semibold container">
          Daftar Artikel
        </h1>
      </section>
      <section className="flex justify-center">
        <section className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 container">
          {dataArtikel?.map((item, i) => (
            <Link
              className="card bg-base-100 shadow-md relative overflow-hidden group cursor-pointer"
              key={i}
              to={`/artikel/${item?.id}`}
            >
              <figure className="w-full h-60 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_IMAGE_DEV}/${item?.image}`}
                  alt={item?.judul || "gambar artikel"}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Badge */}
              <div className="absolute top-2 -left-2">
                <span
                  className={`badge capitalize ${
                    item?.type === "quiz" ? "badge-primary" : "badge-secondary"
                  }`}
                >
                  {item?.type || "Undefined"}
                </span>
              </div>

              {/* Overlay Body */}
              <div className="absolute bottom-0 left-0 w-full bg-white/90 p-3 transition-all duration-300 group-hover:h-full h-20">
                <h2 className="text-md font-semibold">
                  {item?.judul || "Unknown"}
                </h2>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-5">
                  {item?.deskripsi}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </section>
    </MainLayout>
  );
};

export default ArtikelPage;
