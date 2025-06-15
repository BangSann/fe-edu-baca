import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteArtikel } from "../../../../lib/redux/slice/artikelAdminSlice";

const DeleteArtikel = ({ isOpen, selectedData, onClose }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.artikelAdmin);
  // redux state

  async function handleDeleteArtikel(id) {
    try {
      await dispatch(deleteArtikel(id)).unwrap();
      toast.success("Berhasil menghapus data artikel");
      onClose();
    } catch (error) {
      toast.error(error.message || "Gagal menghapus data artikel");
    }
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
          <button
            className="btn btn-error text-white"
            onClick={() => handleDeleteArtikel(selectedData?.id)}
            disabled={isLoading}
          >
            Hapus
          </button>
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteArtikel;
