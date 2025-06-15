import AddSoalLiterasi from "./addSoalLiterasi";
import DeleteSoalLiterasi from "./deleteSoalLiterasi";
import EditSoalLiterasi from "./editSoalLiterasi";
import ViewSoalLiterasi from "./viewSoalLiterasi";

const DialogSoalLiterasi = ({
  isOpen,
  selectedData,
  onClose,
  action,
  getSoalAction,
}) => {
  return (
    <dialog
      id="my_modal_soal_literasi"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-3/5 max-w-5xl">
        <div className="mb-3">
          {action == "add" ? (
            <>
              <h1 className="text-xl font-semibold">Tambah Data Soal</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "edit" ? (
            <>
              <h1 className="text-xl font-semibold">Edit Data Soal</h1>
              <p className="font-light">
                Pastikan untuk mengisi seluruh field pada form ini
              </p>
            </>
          ) : action == "delete" ? (
            <>
              <h1 className="text-xl font-semibold">Hapus Data Soal</h1>
              {/* <p className="font-light">Apakah anda yakin menghapus data ini</p> */}
            </>
          ) : action == "show" ? (
            <>
              <h1 className="text-xl font-semibold">Detail Data Soal</h1>
              <p className="font-light">
                Ini merupakan gambaran lengkap mengenai data soal
              </p>
            </>
          ) : (
            "Invalid action"
          )}
        </div>
        {action == "add" ? (
          <AddSoalLiterasi onClose={onClose} getSoalAction={getSoalAction} />
        ) : action == "edit" ? (
          <EditSoalLiterasi
            onClose={onClose}
            selectedData={selectedData}
            getSoalAction={getSoalAction}
          />
        ) : action == "delete" ? (
          <DeleteSoalLiterasi onClose={onClose} selectedData={selectedData} getSoalAction={getSoalAction}/>
        ) : action == "show" ? (
          <ViewSoalLiterasi onClose={onClose} selectedData={selectedData} />
        ) : (
          <div>Invalid action</div>
        )}
      </div>
    </dialog>
  );
};

export default DialogSoalLiterasi;
