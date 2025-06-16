import { useState } from "react";

const ArtikelDebat = ({ dataArtikel }) => {
  const [showSoal, setShowSoal] = useState(false);
  return (
    <section className="flex flex-col items-center space-y-6">
      <div className=" container p-4 shadow mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-start">
            {dataArtikel?.judul}
          </h1>

          {!showSoal && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowSoal(true)}
            >
              Tampilkan Soal
            </button>
          )}
          {showSoal && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowSoal(false)}
            >
              Tampilkan Artikel
            </button>
          )}
        </div>
        {!showSoal && (
          <div className="w-full h-[80vh] border rounded mt-4 overflow-hidden">
            <iframe
              src={dataArtikel.artikel_link}
              title="Artikel"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {showSoal && (
          <div className="container space-y-3 mt-3">
            {dataArtikel.soal?.map((soalItem, index) => (
              <div
                key={soalItem.id}
                className="card bg-base-100 shadow-sm p-4  border-[0.5px] rounded-md"
              >
                <h3 className="text-start font-semibold">Soal {index + 1}</h3>
                <h3 className="text-start mb-2">{soalItem.soal}</h3>

                <div className="space-y-2 flex flex-col">
                  {["a", "b", "c", "d", "e"].map(
                    (opt) =>
                      soalItem[`opsi_${opt}`] && (
                        <div className="capitalize text-start m-0">
                          {opt}. {soalItem[`opsi_${opt}`]}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtikelDebat;
