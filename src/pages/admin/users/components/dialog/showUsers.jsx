const ShowUsers = ({ onClose, selectedData }) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2">
          <p className="p-2">Nama</p>
          <p className="text-end bg-gray-100 p-2">{selectedData.name}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="p-2">Username</p>
          <p className="text-end bg-gray-100 p-2">{selectedData?.username}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="p-2">Password</p>
          <p className="text-end bg-gray-100 p-2">{selectedData?.password || "undefined"}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="p-2">Sekolah</p>
          <p className="text-end bg-gray-100 p-2">{selectedData?.sekolah?.nama_sekolah || "undefined"}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="p-2">Kelas</p>
          <p className="text-end bg-gray-100 p-2">{selectedData?.kelas?.kelas || "undefined"}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-md btn-outline" onClick={onClose}>
          Tutup
        </button>
      </div>
    </section>
  );
};

export default ShowUsers;
