import HapusBacaan from "./hapusBacaan";
import TambahBacaan from "./tambahBacaan";

const DialogBacaan = ({ isOpen, onClose, action, selectedData }) => {
    return (
    <div id="my_modal_materi" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-3/5 max-w-5xl">
        <div className="mb-3">
          {action == "add" ? (
            <>
              <h1 className="text-xl font-semibold">Tambah Data Bacaan</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "edit" ? (
            <>
              <h1 className="text-xl font-semibold">Edit Data Bacaan</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "delete" ? (
            <>
              <h1 className="text-xl font-semibold">Hapus Data Bacaan</h1>
              {/* <p className="font-light">Apakah anda yakin menghapus data ini</p> */}
            </>
          ) : (
            "Invalid action"
          )}
        </div>
        <div>
          {action == "add" ? (
            <TambahBacaan onClose={onClose} />
          ) : action == "delete" ? (
            <HapusBacaan onClose={onClose} selectedData={selectedData} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
 
export default DialogBacaan;