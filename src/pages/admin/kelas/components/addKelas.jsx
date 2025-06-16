import { Form, Formik } from "formik";
import InputField from "../../components/fieldInput";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addDataKelas } from "../../../../lib/redux/slice/kelasAdminSlice";
import { toast } from "react-toastify";

const kelasShema = yup.object().shape({
  kelas: yup.string().required("Nama kelas required"),
  sekolah_id: yup.string().required("sekolah required"),
});

const AddKelas = ({ onClose, getKelasAction }) => {
  const { id_sekolah } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { isLoading: kelasLoading } = useSelector((state) => state.kelasAdmin);
  // redux state
  async function handleAddKelasData({ data, action }) {
    try {
      const res = await dispatch(addDataKelas(data));
      if (addDataKelas.fulfilled.match(res)) {
        toast.success("berhasil menambahkan data kelas");
        action.resetForm();
        onClose();
      } else {
        toast.error("gagal menambahkan data kelas");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getKelasAction();
    }
  }

  return (
    <section>
      <Formik
        initialValues={{
          kelas: "",
          sekolah_id: id_sekolah,
        }}
        validationSchema={kelasShema}
        enableReinitialize
        onSubmit={(data, action) => handleAddKelasData({ data, action })}
      >
        {({ errors, values, handleChange }) => (
          <Form className="space-y-3">
            <InputField
              error={errors.kelas}
              label={"Nama Kelas"}
              name={"kelas"}
              onchange={handleChange}
              placeholder={"masukkan nama kelas"}
              type={"text"}
              values={values.kelas}
            />
            <div className="flex flex-col space-y-1">
              <label htmlFor="">ID Sekolah</label>
              <input
                className="input input-md input-primary w-full"
                type="text"
                name="sekolah_id"
                value={id_sekolah}
                disabled
              />
            </div>
            <div className="flex gap-2 items-center justify-end pt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={kelasLoading}
              >
                Tambah Kelas
              </button>
              <button
                className="btn btn-outline"
                onClick={onClose}
                type="button"
                disabled={kelasLoading}
              >
                Tutup
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddKelas;
