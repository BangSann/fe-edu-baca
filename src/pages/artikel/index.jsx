import { useEffect, useState } from "react";
import MainLayout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelDataAdmin } from "../../lib/redux/slice/artikelAdminSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCookies } from "cookies-next";
import Pagination from "../admin/components/pagination";

const ArtikelPage = () => {
  // type state
  const [typeParams] = useSearchParams();
  const type = typeParams?.get("type") || "";
  // type state

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

  // filter state
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 6;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = dataArtikel?.filter(
    (item) =>
      item?.judul?.toLowerCase().includes(searchParams?.toLowerCase()) &&
      item?.type?.toLowerCase().includes(type?.toLowerCase())
  );
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // filter state

  return (
    <MainLayout>
      <section className="h-[calc(100vh-65px)]">
        {isLoading ? (
          <section className="flex justify-center p-4">
            <div className="skeleton h-32 w-full mt-3 container"></div>
          </section>
        ) : (
          <>
            <section className="my-4 flex justify-center">
              <section className="container p-4">
                <section className="flex">
                  <input
                    type="text"
                    className="input input-neutral w-full rounded-e-none bg-white"
                    placeholder="Cari Artikel"
                    onChange={(e) => setSearchParams(e.target.value)}
                    value={searchParams}
                  />
                  <button
                    className="btn btn-outline rounded-s-none bg-slate-500 text-white border-2 border-slate-500"
                    onClick={() => setSearchParams("")}
                  >
                    Bersihkan
                  </button>
                </section>
                {currentDatas?.length <= 0 ? (
                  <section className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <h1 className="text-2xl font-semibold">
                        Artikel Tidak Ditemukan
                      </h1>
                      <p className="text-gray-500 mt-2">
                        Coba ubah kata kunci pencarian atau periksa kembali
                        kategori yang dipilih.
                      </p>
                    </div>
                  </section>
                ) : (
                  <>
                    <section className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 ">
                      {currentDatas?.map((item, i) => (
                        <Link
                          className="card bg-base-100 shadow-md relative overflow-hidden group cursor-pointer"
                          key={i}
                          to={`/artikel/${item?.id}`}
                        >
                          <figure className="w-full h-60 overflow-hidden">
                            <img
                              src={`${import.meta.env.VITE_API_IMAGE_DEV}/${
                                item?.image
                              }`}
                              alt={item?.judul || "gambar artikel"}
                              className="w-full h-full object-cover"
                            />
                          </figure>

                          {/* Badge */}
                          <div className="absolute top-2 -left-2">
                            <span
                              className={`badge capitalize ${
                                item?.type === "quiz"
                                  ? "badge-primary"
                                  : "badge-secondary"
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
                    <Pagination
                      dataLength={filteredData?.length}
                      dataShowCount={showDataIndex}
                      setDataShowItems={(e) => setDataShowItems(e)}
                    />
                  </>
                )}
              </section>
            </section>
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default ArtikelPage;
