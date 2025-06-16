import { Form, Formik } from "formik";
import InputField from "../../components/fieldInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateDataSekolah } from "../../../../lib/redux/slice/sekolahAdminSlice";

const sekolahSchema = yup.object().shape({
  nama_sekolah: yup.string().required("sekolah is required"),
});

const UpdateSekolah = ({ onClose, getSekolahAction, selectedData }) => {
  // redux state
  const dispatch = useDispatch();
  const { isLoading: sekolahLoading } = useSelector(
    (state) => state.sekolahAdmin
  );
  // redux state

  async function handleAddSekolah({ data, action }) {
    try {
      const res = await dispatch(updateDataSekolah(data));
      if (updateDataSekolah.fulfilled.match(res)) {
        toast.success("Berhasil mengubah data sekolah ");
        action.resetForm();
        onClose();
      } else {
        toast.error("Gagal mengubah data sekolah ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getSekolahAction();
    }
  }
  return (
    <section>
      <Formik
        initialValues={{
          id: selectedData?.id,
          nama_sekolah: selectedData?.nama_sekolah,
        }}
        enableReinitialize
        validationSchema={sekolahSchema}
        onSubmit={(data, action) => handleAddSekolah({ data, action })}
      >
        {({ errors, values, handleChange }) => (
          <Form className="space-y-3">
            <InputField
              error={errors.nama_sekolah}
              label={"Nama Sekolah"}
              name={"nama_sekolah"}
              onchange={handleChange}
              placeholder={"masukkan nama sekolah"}
              type={"text"}
              values={values.nama_sekolah}
            />
            <div className="flex justify-end items-center gap-2">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={sekolahLoading}
              >
                Update
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={onClose}
                disabled={sekolahLoading}
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

export default UpdateSekolah;
