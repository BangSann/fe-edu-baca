import { useEffect, useState } from "react";
import MainLayout from "../layout";
import Pagination from "../admin/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getMateri } from "../../lib/redux/slice/materiSlice";
import { Link } from "react-router-dom";

const MateriUsersPage = () => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: materiData } = useSelector((state) => state.materi);
  // redux state

  useEffect(() => {
    async function handleGeMateri() {
      try {
        const res = await dispatch(getMateri());
        if (!getMateri.fulfilled.match(res)) {
          console.log("Gagal fetch:", res);
        }
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    }

    handleGeMateri();
  }, []);

  // Filter & Pagination
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 6;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = materiData?.filter((item) =>
    item?.judul?.toLowerCase().includes(searchParams?.toLowerCase())
  );
  
  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // Filter & Pagination

  return (
    <MainLayout>
      <section className="container mx-auto px-4 py-6 h-[calc(100vh-65px)]">
        {/* Search Input */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Cari materi..."
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
            className="w-full px-4 py-2 border rounded-e-none border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="btn btn-outline rounded-s-none"
            onClick={() => setSearchParams("")}
          >
            Clear
          </button>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: showDataIndex }).map((_, index) => (
              <div
                key={index}
                className="skeleton h-40 w-full rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>
        ) : currentDatas.length <= 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-md">
            <p className="text-xl font-bold text-red-500 mb-4">
              Materi Belum Ada
            </p>
          </div>
        ) : (
          <>
            {/* Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
              {currentDatas?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={
                      import.meta.env.VITE_API_IMAGE_MATERI_DEV+item?.cover
                    }
                    alt={item.judul}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.judul}</h3>
                    <Link
                      to={`/materi/${item?.id}`}
                      className="inline-block text-sm text-blue-600 hover:underline"
                    >
                      Lihat Materi PDF
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                dataLength={filteredData?.length}
                dataShowCount={showDataIndex}
                setDataShowItems={setDataShowItems}
              />
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default MateriUsersPage;
