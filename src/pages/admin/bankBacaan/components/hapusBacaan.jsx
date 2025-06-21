import { useDispatch, useSelector } from "react-redux";
import { deleteBacaan } from "../../../../lib/redux/slice/bacaanSlice";
import { toast } from "react-toastify";

const HapusBacaan = ({ selectedData, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bacaan);

  async function handelHapusBacaan() {
    try {
      const res = await dispatch(deleteBacaan(selectedData));
      if (deleteBacaan.fulfilled.match(res)) {
        toast.success("Berhasil hapus data bacaan");
        onClose();
      } else {
        toast.error("Gagal hapus data bacaan");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handelHapusBacaan}
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

export default HapusBacaan;
