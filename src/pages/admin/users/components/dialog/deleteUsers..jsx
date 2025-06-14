import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteUsersDataAdmin,
  getUsersDataAdmin,
} from "../../../../../lib/redux/slice/usersAdminSlice";

const DeleteUsers = ({ onClose, selectedData }) => {
  const { isLoading } = useSelector((state) => state.usersAdmin);
  const dispatch = useDispatch();

  async function handelDeleteUsers() {
    try {
      const res = await dispatch(deleteUsersDataAdmin(selectedData));
      if (deleteUsersDataAdmin.fulfilled.match(res)) {
        toast.success("Berhasil menghapus data users");
        onClose();
      } else {
        toast.error("Gagal menghapus data users");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getUsersDataAdmin());
  }
  return (
    <section className="space-y-4">
      <p className="text-lg">Apakah Anda Yakin Menghapus Data ini ?</p>
      <div className="space-x-2 flex justify-end">
        <button
          className="btn btn-error btn-md text-white"
          onClick={handelDeleteUsers}
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

export default DeleteUsers;
