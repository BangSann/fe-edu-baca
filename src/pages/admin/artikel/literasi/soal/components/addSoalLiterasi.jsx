import { Form, Formik } from "formik";
import { soalSchema } from "../../../../../../constant/soalSchema";
import InputField from "../../../../components/fieldInput";
import TextError from "../../../../../../components/textError";
import { toast } from "react-toastify";

const AddSoalLiterasi = ({ onClose }) => {
  async function handleAddSoal({ values, action }) {
    console.log(values);
    toast.success("Berhasil menambahkan data soal");
    onClose();
    action.resetForm();
  }
  return (
    <Formik
      initialValues={{
        soal: "",
        opsi_a: "",
        opsi_b: "",
        opsi_c: "",
        opsi_d: "",
        opsi_e: "",
        jawaban_benar: "",
        score: "",
        id_artikel: "",
      }}
      validationSchema={soalSchema}
      onSubmit={(values, action) => {
        handleAddSoal({ values, action });
      }}
    >
      {({ errors, values, handleChange }) => (
        <Form>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="">Soal</label>
            <textarea
              name="soal"
              placeholder="masukkan soal"
              className={`textarea w-full ${
                errors.soal && "outline outline-red-500"
              }`}
              value={values.soal}
              onChange={handleChange}
            />
            {errors.soal && <TextError>{errors.soal}</TextError>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label={"Opsi A"}
              error={errors.opsi_a}
              name={"opsi_a"}
              onchange={handleChange}
              placeholder={"Masukkan opsi a"}
              type={"text"}
              values={values.opsi_a}
            />
            <InputField
              label={"Opsi B"}
              error={errors.opsi_b}
              name={"opsi_b"}
              onchange={handleChange}
              placeholder={"Masukkan opsi b"}
              type={"text"}
              values={values.opsi_b}
            />
            <InputField
              label={"Opsi C"}
              error={errors.opsi_c}
              name={"opsi_c"}
              onchange={handleChange}
              placeholder={"Masukkan opsi c"}
              type={"text"}
              values={values.opsi_c}
            />
            <InputField
              label={"Opsi D"}
              error={errors.opsi_d}
              name={"opsi_d"}
              onchange={handleChange}
              placeholder={"Masukkan opsi d"}
              type={"text"}
              values={values.opsi_d}
            />
            <InputField
              label={"Opsi E"}
              error={errors.opsi_e}
              name={"opsi_e"}
              onchange={handleChange}
              placeholder={"Masukkan opsi e"}
              type={"text"}
              values={values.opsi_e}
            />
            <div className="flex flex-col space-y-1">
              <label htmlFor="">Artikel</label>
              <select
                className={`select select-md w-full  ${
                  errors.id_artikel && "outline outline-red-500"
                }`}
                name="id_artikel"
                value={values.id_artikel}
                onChange={handleChange}
              >
                <option value="">Pilih artikel</option>
                <option value="judul 1">judul 1</option>
                <option value="judul 2">judul 2</option>
              </select>
              {errors.id_artikel && <TextError>{errors.id_artikel}</TextError>}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="">Jawaban Benar</label>
              <select
                className={`select select-md w-full  ${
                  errors.id_artikel && "outline outline-red-500"
                }`}
                name="jawaban_benar"
                value={values.jawaban_benar}
                onChange={handleChange}
              >
                <option value="">Pilih artikel</option>
                {values.opsi_a && (
                  <option value={values.opsi_a}>{values.opsi_a}</option>
                )}
                {values.opsi_b && (
                  <option value={values.opsi_b}>{values.opsi_b}</option>
                )}
                {values.opsi_c && (
                  <option value={values.opsi_c}>{values.opsi_c}</option>
                )}
                {values.opsi_d && (
                  <option value={values.opsi_d}>{values.opsi_d}</option>
                )}
                {values.opsi_e && (
                  <option value={values.opsi_e}>{values.opsi_e}</option>
                )}
              </select>
              {errors.jawaban_benar && (
                <TextError>{errors.jawaban_benar}</TextError>
              )}
            </div>
            <InputField
              label={"Score"}
              error={errors.score}
              name={"score"}
              onchange={handleChange}
              placeholder={"Masukkan score"}
              type={"number"}
              values={values.score}
            />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button className="btn btn-primary" type="submit">
              Tambah Soal
            </button>
            <button className="btn btn-outline" type="button" onClick={onClose}>
              Tutup
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSoalLiterasi;
