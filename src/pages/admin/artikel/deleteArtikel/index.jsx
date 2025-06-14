import { toast } from "react-toastify";

const DeleteArtikel = ({ isOpen, selectedData, onClose }) => {
  async function handleDeleteArtikel() {
    toast.success("Berhasil menghapus data artikel");
    onClose();
  }
  return (
    <dialog
      id="my_modal_users"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box space-y-4">
        <h1 className="text-xl">Hapus Data Artikel</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero,
          maxime?
        </p>
        <div className="flex items-center justify-end gap-2">
          <button className="btn btn-error text-white" onClick={handleDeleteArtikel}>
            Hapus
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteArtikel;
