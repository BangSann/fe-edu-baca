import { Form, Formik } from "formik";
import InputField from "../../components/fieldInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateDataKelas } from "../../../../lib/redux/slice/kelasAdminSlice";
import { useParams } from "react-router-dom";

const kelasShema = yup.object().shape({
  kelas: yup.string().required("Nama kelas required"),
  sekolah_id: yup.string().required("sekolah required"),
});

const UpdateKelas = ({ onClose, selectedData, getKelasAction }) => {
  const { id_sekolah } = useParams();
  // redux state
  const dispatch = useDispatch();
  const { isLoading: kelasLoading } = useSelector((state) => state.kelasAdmin);
  async function handleUpdateKelas({ data, action }) {
    try {
      const res = await dispatch(updateDataKelas(data));
      if (updateDataKelas.fulfilled.match(res)) {
        toast.success("Berhasil mengubah data kelas ");
        action.resetForm();
        onClose();
      } else {
        toast.error("Gagal mengubah data kelas ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getKelasAction();
    }
  }
  // redux state
  return (
    <section>
      <Formik
        initialValues={{
          id: selectedData?.id,
          kelas: selectedData?.kelas,
          sekolah_id: id_sekolah,
        }}
        validationSchema={kelasShema}
        enableReinitialize
        onSubmit={(data, action) => handleUpdateKelas({ data, action })}
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
              values={values?.kelas}
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

export default UpdateKelas;
