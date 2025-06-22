import { Form, Formik } from "formik";
import InputField from "../../components/fieldInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addBacaan } from "../../../../lib/redux/slice/bacaanSlice";
import { toast } from "react-toastify";
import TextError from "../../../../components/textError";

const bacaanSchema = yup.object().shape({
  judul: yup.string().required("Judul harus diisi"),
  cover: yup
    .mixed()
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
  pdf: yup
    .mixed()
    .required("PDF wajib diunggah")
    .test("fileType", "File harus berupa PDF", (value) => {
      return value && value.type === "application/pdf";
    }),
});

const TambahBacaan = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bacaan);

  const handleAddBacaan = async (values) => {
    try {
      const res = await dispatch(addBacaan(values));
      if (addBacaan.fulfilled.match(res)) {
        toast.success("Berhasil menambahkan bacaan");
        onClose();
      } else {
        toast.error("Gagal menambahkan bacaan");
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat mengunggah");
    }
  };

  return (
    <Formik
      initialValues={{
        judul: "",
        cover: null,
        pdf: null,
      }}
      validationSchema={bacaanSchema}
      onSubmit={handleAddBacaan}
    >
      {({ errors, values, handleChange, setFieldValue, touched }) => (
        <Form className="space-y-3">
          <InputField
            error={errors.judul}
            name={"judul"}
            label={"Judul Bacaan"}
            onchange={handleChange}
            placeholder={"Masukkan judul"}
            type={"text"}
            values={values.judul}
          />

          <div className="">
            <label className="block mb-1 font-medium">Cover Bacaan</label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              className="file-input file-input-neutral w-full"
              onChange={(event) => {
                setFieldValue("cover", event.currentTarget.files[0]);
              }}
            />
            {errors.cover && touched.cover && (
              <TextError>{errors.cover}</TextError>
            )}
          </div>

          <div className="">
            <label className="block mb-1 font-medium">File PDF</label>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              className="file-input file-input-neutral w-full"
              onChange={(event) => {
                setFieldValue("pdf", event.currentTarget.files[0]);
              }}
            />
            {errors.pdf && touched.pdf && <TextError>{errors.pdf}</TextError>}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              Tambah Bacaan
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Tutup
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TambahBacaan;
