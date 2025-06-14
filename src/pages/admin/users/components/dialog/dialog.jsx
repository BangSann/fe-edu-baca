import AddUsers from "./addUsers";
import DeleteUsers from "./deleteUsers.";
import EditUsers from "./editUsers";
import ShowUsers from "./showUsers";

const UsersDialog = ({ isOpen, onClose, action, selectedData }) => {
  return (
    <dialog id="my_modal_users" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-3/5 max-w-5xl">
        <div className="mb-3">
          {action == "add" ? (
            <>
              <h1 className="text-xl font-semibold">Tambah Data Pengguna</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "edit" ? (
            <>
              <h1 className="text-xl font-semibold">Edit Data Pengguna</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "delete" ? (
            <>
              <h1 className="text-xl font-semibold">Hapus Data Pengguna</h1>
              {/* <p className="font-light">Apakah anda yakin menghapus data ini</p> */}
            </>
          ) : action == "show" ? (
            <>
              <h1 className="text-xl font-semibold">Detail Data Pengguna</h1>
              <p className="font-light">
                Ini merupakan gambaran lengkap mengenai data pengguna
              </p>
            </>
          ) : (
            "Invalid action"
          )}
        </div>
        {action == "add" ? (
          <AddUsers onClose={onClose} />
        ) : action == "edit" ? (
          <EditUsers onClose={onClose} selectedData={selectedData} />
        ) : action == "delete" ? (
          <DeleteUsers onClose={onClose} selectedData={selectedData} />
        ) : action == "show" ? (
          <ShowUsers onClose={onClose} selectedData={selectedData} />
        ) : (
          ""
        )}
      </div>
    </dialog>
  );
};

export default UsersDialog;
