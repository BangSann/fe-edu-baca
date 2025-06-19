import { Form, Formik } from "formik";
import InputField from "../../components/fieldInput";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const presensiSchema = yup.object().shape({
  tanggal: yup.string().required("Tanggal presensi harus diisi"),
});

const DialogPresensi = ({ isOpen, onClose, selectedData }) => {
  const navigate = useNavigate();
  return (
    <div
      id="my_modal_presensi"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box w-3/5 max-w-5xl">
        <Formik
          initialValues={{ tanggal: "" }}
          validationSchema={presensiSchema}
          onSubmit={(values) =>
            navigate(`${selectedData.id}?tanggal=${values.tanggal}`)
          }
        >
          {({ errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                name="tanggal"
                type={"date"}
                error={errors.tanggal}
                label="Masukkan Tanggal Presensi"
                onchange={handleChange}
              />

              <div className="mt-4 flex justify-end gap-2">
                <button type="submit" className="btn btn-primary">
                  Lihat Presensi
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Tutup
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DialogPresensi;
