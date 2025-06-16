import { useDispatch, useSelector } from "react-redux";
import { deleteDataKelas } from "../../../../lib/redux/slice/kelasAdminSlice";
import { toast } from "react-toastify";

const HapusKelas = ({ onClose, selectedData, getKelasAction }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading: kelasLoading } = useSelector((state) => state.kelasAdmin);
  async function handleDeleteKelas() {
    try {
      const res = await dispatch(deleteDataKelas(selectedData));
      if (deleteDataKelas.fulfilled.match(res)) {
        toast.success("Berhasil hapus data kelas ");
        onClose();
      } else {
        toast.error("Gagal hapus data kelas ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getKelasAction();
    }
  }
  // redux state
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handleDeleteKelas}
          disabled={kelasLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-outline btn-md"
          onClick={onClose}
          disabled={kelasLoading}
        >
          Tutup
        </button>
      </div>
    </section>
  );
};

export default HapusKelas;
