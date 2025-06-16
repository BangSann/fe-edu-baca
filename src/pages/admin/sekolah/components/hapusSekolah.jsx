import { useDispatch, useSelector } from "react-redux";
import { deleteDataSekolah } from "../../../../lib/redux/slice/sekolahAdminSlice";
import { toast } from "react-toastify";

const HapusSekolah = ({ onClose, selectedData, getSekolahAction }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading: sekolahLoading } = useSelector(
    (state) => state.sekolahAdmin
  );
  // redux state

  async function handleDeleteSekolah() {
    try {
      const res = await dispatch(deleteDataSekolah(selectedData));
      if (deleteDataSekolah.fulfilled.match(res)) {
        toast.success("Berhasil hapus data sekolah ");
        onClose();
      } else {
        toast.error("Gagal hapus data sekolah ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getSekolahAction();
    }
  }
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handleDeleteSekolah}
          disabled={sekolahLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-outline btn-md"
          onClick={onClose}
          disabled={sekolahLoading}
        >
          Tutup
        </button>
      </div>
    </section>
  );
};

export default HapusSekolah;
