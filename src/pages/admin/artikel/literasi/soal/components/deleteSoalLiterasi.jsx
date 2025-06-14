import { toast } from "react-toastify";

const DeleteSoalLiterasi = ({ onClose, selectedData }) => {
  async function handleDeleteSoal() {
    toast.success("berhasil hapus soal literasi");
    onClose();
  }
  return (
    <section>
      <div>
        <h1>Apakah anda yakin menghapus soal ini !</h1>
      </div>
      <div className="space-x-2 flex items-center justify-end mt-4">
        <button className="btn btn-error text-white" onClick={handleDeleteSoal}>
          Hapus
        </button>
        <button className="btn btn-outline" onClick={onClose}>
          Tutup
        </button>
      </div>
    </section>
  );
};

export default DeleteSoalLiterasi;
