import { useDispatch, useSelector } from "react-redux";
import { deletePerangkatMateri } from "../../../../lib/redux/slice/perangkatMateriSlice";
import { toast } from "react-toastify";

const HapusModul = ({ selectedData, onClose }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.perangkatMateri);
  // redux state

  async function handleDeleteModul() {
    try {
      const res = await dispatch(deletePerangkatMateri(selectedData));
      if (deletePerangkatMateri.fulfilled.match(res)) {
        toast.success("Berhasil menghapus modul guru");
        onClose();
      } else {
        toast.success("Gagal menghapus modul guru");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  }
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handleDeleteModul}
          disabled={isLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-outline btn-md"
          onClick={onClose}
          disabled={isLoading}
        >
          Tutup
        </button>
      </div>
    </section>
  );
};

export default HapusModul;
