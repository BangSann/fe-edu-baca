import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hapusMateri } from "../../../../lib/redux/slice/materiSlice";

const HapusMateri = ({ selectedData, onClose }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading: materiLoading } = useSelector((state) => state.materi);
  async function handleDeleteMateri() {
    try {
      const res = await dispatch(hapusMateri(selectedData));
      if (hapusMateri.fulfilled.match(res)) {
        toast.success("Berhasil hapus data materi ");
        onClose();
      } else {
        toast.error("Gagal hapus data materi ");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // redux state
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handleDeleteMateri}
          disabled={materiLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-outline btn-md"
          onClick={onClose}
          disabled={materiLoading}
        >
          Tutup
        </button>
      </div>
    </section>
  );
};

export default HapusMateri;
