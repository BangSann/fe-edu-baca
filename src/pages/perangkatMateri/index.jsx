import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout";
import { useEffect, useState } from "react";
import { getPerangkatMateri } from "../../lib/redux/slice/perangkatMateriSlice";
import Pagination from "../admin/components/pagination";
import { Link } from "react-router-dom";

const PerangkatMateriPage = () => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading, data: perangkatMateriData } = useSelector(
    (state) => state.perangkatMateri
  );
  // redux state
  useEffect(() => {
    async function handleGetPerangkatMateri() {
      try {
        const res = await dispatch(getPerangkatMateri());
        if (!getPerangkatMateri.fulfilled.match(res)) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleGetPerangkatMateri();
  }, []);

  // Filter & Pagination
  const [searchParams, setSearchParams] = useState("");
  const showDataIndex = 6;
  const [dataShowItems, setDataShowItems] = useState({
    start: 0,
    end: showDataIndex - 1,
  });

  const filteredData = perangkatMateriData?.filter((item) =>
    item?.judul?.toLowerCase().includes(searchParams?.toLowerCase())
  );

  const currentDatas = filteredData?.slice(
    dataShowItems.start,
    dataShowItems.end + 1
  );
  // Filter & Pagination

  console.log(perangkatMateriData);
  return (
    <MainLayout>
      <section className="container mx-auto mt-4 p-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentDatas?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={
                      item.cover ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={item.judul}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.judul}</h3>
                    <Link
                      to={`/perangkat-materi/${item?.id}`}
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

export default PerangkatMateriPage;
