const ViewSoalLiterasi = ({ onClose, selectedData }) => {
  return (
    <section>
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm">Soal</p>
          <p className="p-2 bg-slate-100">{selectedData?.soal}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-sm">Opsi A</p>
            <p
              className={`p-2 ${
                selectedData?.opsi_a === selectedData?.jawaban
                  ? "bg-green-300"
                  : "bg-slate-100"
              }`}
            >
              {selectedData?.opsi_a}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi B</p>
            <p
              className={`p-2 ${
                selectedData?.opsi_b === selectedData?.jawaban
                  ? "bg-green-300"
                  : "bg-slate-100"
              }`}
            >
              {selectedData?.opsi_b}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi C</p>
            <p
              className={`p-2 ${
                selectedData?.opsi_c === selectedData?.jawaban
                  ? "bg-green-300"
                  : "bg-slate-100"
              }`}
            >
              {selectedData?.opsi_c}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi D</p>
            <p
              className={`p-2 ${
                selectedData?.opsi_d === selectedData?.jawaban
                  ? "bg-green-300"
                  : "bg-slate-100"
              }`}
            >
              {selectedData?.opsi_d}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi E</p>
            <p
              className={`p-2 ${
                selectedData?.opsi_e === selectedData?.jawaban
                  ? "bg-green-300"
                  : "bg-slate-100"
              }`}
            >
              {selectedData?.opsi_e}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Jawaban Benar</p>
            <p className="p-2 bg-slate-100">{selectedData?.jawaban}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Score</p>
            <p className="p-2 bg-slate-100">{selectedData?.score}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn btn-outline" onClick={onClose}>
          Tutup
        </button>
      </div>
    </section>
  );
};

export default ViewSoalLiterasi;
