import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteNilaiLiterasi } from "../../../../../../lib/redux/slice/nilaiLiterasiSlice";

const DeleteNilai = ({ isOpen, selectedData, onClose, getNilaiAction }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading: loadingNilai } = useSelector(
    (state) => state.nilaiLiterasi
  );
  // redux state

  async function handleDeleteArtikel() {
    try {
      const res = await dispatch(deleteNilaiLiterasi(selectedData?.id));
      if (deleteNilaiLiterasi.fulfilled.match(res)) {
        toast.success("Berhasil menghapus data nilai");
        onClose();
      } else {
        toast.error("Gagal menghapus data nilai");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getNilaiAction();
    }
  }
  return (
    <dialog
      id="my_modal_users"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box space-y-4">
        <h1 className="text-xl">Hapus Data Nilai</h1>
        <p>Apakah anda yakin untuk menghapus nilai siswa ini ?</p>
        <div className="flex items-center justify-end gap-2">
          <button
            className="btn btn-error text-white"
            onClick={handleDeleteArtikel}
            disabled={loadingNilai}
          >
            Hapus
          </button>
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={loadingNilai}
          >
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteNilai;
