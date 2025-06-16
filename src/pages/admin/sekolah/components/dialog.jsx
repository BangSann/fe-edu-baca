import AddSekolah from "./addSekolah";
import HapusSekolah from "./hapusSekolah";
import UpdateSekolah from "./updateSekolah";

const DialogSekolah = ({
  isOpen,
  onClose,
  action,
  selectedData,
  getSekolahAction,
}) => {
  return (
    <div
      id="my_modal_sekolah"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-3/5 max-w-5xl">
        <div className="mb-3">
          {action == "add" ? (
            <>
              <h1 className="text-xl font-semibold">Tambah Data Sekolah</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "edit" ? (
            <>
              <h1 className="text-xl font-semibold">Edit Data Sekolah</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "delete" ? (
            <>
              <h1 className="text-xl font-semibold">Hapus Data Sekolah</h1>
              {/* <p className="font-light">Apakah anda yakin menghapus data ini</p> */}
            </>
          ) : (
            "Invalid action"
          )}
        </div>
        <div>
          {action == "add" ? (
            <AddSekolah onClose={onClose} getSekolahAction={getSekolahAction} />
          ) : action == "delete" ? (
            <HapusSekolah
              getSekolahAction={getSekolahAction}
              onClose={onClose}
              selectedData={selectedData}
            />
          ) : action == "edit" ? (
            <UpdateSekolah
              getSekolahAction={getSekolahAction}
              onClose={onClose}
              selectedData={selectedData}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogSekolah;
