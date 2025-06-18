import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createMateri } from "../../../../lib/redux/slice/materiSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  judul: Yup.string().required("Judul wajib diisi"),
  cover: Yup.mixed()
    .required("Cover wajib diunggah")
    .test("fileType", "Format harus berupa gambar", (value) => {
      return (
        value &&
        [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/svg+xml",
        ].includes(value.type)
      );
    }),
  pdf: Yup.mixed()
    .required("PDF wajib diunggah")
    .test("fileType", "File harus berupa PDF", (value) => {
      return value && value.type === "application/pdf";
    }),
});

const AddMateri = ({ onClose }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.materi);
  // redux state

  const handleSubmit = async (values) => {
    try {
      const res = await dispatch(createMateri(values));
      if (createMateri.fulfilled.match(res)) {
        toast.success("Berhasil manambahkan materi");
        onClose();
      } else {
        toast.error("Gagal manambahkan materi");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  return (
    <Formik
      initialValues={{ judul: "", cover: null, pdf: null }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="block font-medium">Judul</label>
            <Field name="judul" className="border p-2 w-full" />
            <ErrorMessage
              name="judul"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium">Cover (Gambar)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFieldValue("cover", e.currentTarget.files[0])}
              className="file-input w-full"
            />
            <ErrorMessage
              name="cover"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium">File PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFieldValue("pdf", e.currentTarget.files[0])}
              className="file-input w-full"
            />
            <ErrorMessage
              name="pdf"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              disabled={isLoading}
            >
              Batal
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddMateri;
