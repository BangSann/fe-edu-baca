import AddKelas from "./addKelas";
import HapusKelas from "./hapusKelas";
import UpdateKelas from "./updateKelas";

const DialogKelas = ({
  isOpen,
  onClose,
  action,
  selectedData,
  getKelasAction,
}) => {
  return (
    <div id="my_modal_kelas" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-3/5 max-w-5xl">
        <div className="mb-3">
          {action == "add" ? (
            <>
              <h1 className="text-xl font-semibold">Tambah Data Kelas</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "edit" ? (
            <>
              <h1 className="text-xl font-semibold">Edit Data Kelas</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "delete" ? (
            <>
              <h1 className="text-xl font-semibold">Hapus Data Kelas</h1>
              {/* <p className="font-light">Apakah anda yakin menghapus data ini</p> */}
            </>
          ) : (
            "Invalid action"
          )}
        </div>
        <div>
          {action == "add" ? (
            <AddKelas onClose={onClose} getKelasAction={getKelasAction} />
          ) : action == "delete" ? (
            <HapusKelas
              getKelasAction={getKelasAction}
              onClose={onClose}
              selectedData={selectedData}
            />
          ) : action == "edit" ? (
            <UpdateKelas
              getKelasAction={getKelasAction}
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

export default DialogKelas;
