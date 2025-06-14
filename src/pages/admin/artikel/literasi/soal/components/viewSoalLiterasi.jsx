const ViewSoalLiterasi = ({ onClose, selectedData }) => {
  return (
    <section>
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm">Soal</p>
          <p className="p-2 bg-slate-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-sm">Opsi A</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi B</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi C</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi D</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Opsi E</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Jawaban Benar</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Score</p>
            <p className="p-2 bg-slate-100">10</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm">Judul Artikel</p>
            <p className="p-2 bg-slate-100">Lorem ipsum dolor sit amet.</p>
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
