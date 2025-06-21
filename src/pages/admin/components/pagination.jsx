import { startTransition, useEffect, useState } from "react";

const Pagination = ({
  dataLength = 0,
  dataShowCount = 0,
  setDataShowItems = {},
}) => {
  const paginateLength = Math.ceil(dataLength / dataShowCount);
  const [currentPage, setCurretPage] = useState(1);

  function handleNextPage() {
    setCurretPage(currentPage + 1);
  }
  function handlePrevPage() {
    setCurretPage(currentPage - 1);
  }

  useEffect(() => {
    setCurretPage(1);
  }, [dataLength]);

  useEffect(() => {
    setDataShowItems({
      start: currentPage * dataShowCount - dataShowCount,
      end : currentPage * dataShowCount - 1
    });
  }, [currentPage]);

  return (
    <section className="w-full flex justify-end mt-3">
      <div className="join">
        <button
          className="join-item btn"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
        >
          «
        </button>
        <button className="btn btn-outline">Halaman {currentPage}</button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={paginateLength <= currentPage}
        >
          »
        </button>
      </div>
    </section>
  );
};

export default Pagination;
