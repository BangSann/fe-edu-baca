import { toast } from "react-toastify";
import { deleteSoalLiterasi } from "../../../../../../lib/redux/slice/soalLiterasiSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteSoalLiterasi = ({ onClose, selectedData, getSoalAction }) => {
  console.log(selectedData)
  // redux state
  const dispatch = useDispatch();
  const { isLoading: loadingSoal } = useSelector((state) => state.soalLiterasi);
  // redux state

  async function handleDeleteSoal() {
    try {
      const res = await dispatch(deleteSoalLiterasi(selectedData?.id));
      console.log(res);
      if (deleteSoalLiterasi.fulfilled.match(res)) {
        toast.success("berhasil hapus soal literasi");
        onClose();
      } else {
        toast.error("Gagal hapus soal literasi");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getSoalAction();
    }
  }

  return (
    <section>
      <div>
        <h1>Apakah anda yakin menghapus soal ini !</h1>
      </div>
      <div className="space-x-2 flex items-center justify-end mt-4">
        <button
          className="btn btn-error text-white"
          onClick={handleDeleteSoal}
          disabled={loadingSoal}
        >
          Hapus
        </button>
        <button
          disabled={loadingSoal}
          className="btn btn-outline"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </section>
  );
};

export default DeleteSoalLiterasi;
