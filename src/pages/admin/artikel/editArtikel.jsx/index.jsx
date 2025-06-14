import { Form, Formik } from "formik";
import AdminLayout from "../../layout";
import InputField from "../../components/fieldInput";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import TextError from "../../../../components/textError";
import { artikelSchema } from "../../../../constant/artikelSchema";
import { toast } from "react-toastify";

const EditArtikelPage = () => {
  const navigate = useNavigate();

  async function handleEditArtikel(values) {
    console.log(values);
    navigate("../");
    toast.success("Berhasil mengubah artikel");
  }
  return (
    <AdminLayout>
      <section className="mb-3 flex w-full gap-2 justify-between items-center">
        <h1 className="text-lg font-semibold">Edit Data Artikel</h1>
      </section>
      <Formik
        initialValues={{
          judul: "default value",
          artikel_link: "https://www.npmjs.com/package/react-toastify",
          type: "quiz",
          deskripsi: "default description",
        }}
        validationSchema={artikelSchema}
        onSubmit={(values) => handleEditArtikel(values)}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <div className="grid grid-cols-3 gap-3">
              <section className="col-span-2 bg-gray-200 h-[80vh]">
                <iframe
                  src={values.artikel_link}
                  width="100%"
                  height={"100%"}
                  className="z-10"
                />
                <dialog dialog id="my_modal_artikel" className={`modal`}>
                  <div className="modal-box space-y-3">
                    <InputField
                      placeholder={"Link Artikel"}
                      label={"Artikel Link"}
                      error={errors.artikel_link}
                      name={"artikel_link"}
                      onchange={handleChange}
                      type={"text"}
                      values={values.artikel_link}
                    />
                    <button
                      className="btn btn-md btn-outline"
                      type="button"
                      onClick={() =>
                        document.getElementById("my_modal_artikel").close()
                      }
                    >
                      Tutup
                    </button>
                  </div>
                </dialog>
              </section>
              <section className="space-y-3 col-span-1">
                <div className="space-y-1">
                  <button
                    className="btn btn-primary w-full"
                    type="button"
                    onClick={() => {
                      document.getElementById("my_modal_artikel").showModal();
                    }}
                  >
                    <BiPencil size={24} />
                    Tambah Link Artikel
                  </button>
                  {errors.artikel_link && (
                    <TextError>{errors.artikel_link}</TextError>
                  )}
                </div>
                <InputField
                  error={errors.judul}
                  label={"Judul"}
                  onchange={handleChange}
                  values={values.judul}
                  name={"judul"}
                  placeholder={"Judul"}
                  type={"text"}
                />
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Type</label>
                  <select
                    className={`select select-md w-full ${
                      errors.type && "outline outline-red-500"
                    }`}
                    name="type"
                    onChange={handleChange}
                    value={values.type}
                  >
                    <option value="">Pilih fungsi artikel</option>
                    <option value="quiz">Quiz</option>
                    <option value="debat">Debat</option>
                  </select>
                  {errors.type && <TextError>{errors.type}</TextError>}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Deskripsi</label>
                  <textarea
                    className={`textarea textarea-md w-full ${
                      errors.deskripsi && "outline outline-red-500"
                    }`}
                    onChange={handleChange}
                    value={values.deskripsi}
                    name="deskripsi"
                  />
                  {errors.deskripsi && (
                    <TextError>{errors.deskripsi}</TextError>
                  )}
                </div>
                <div className="space-x-2 pt-3 flex justify-end">
                  <button className="btn  btn-primary btn-lg" type="submit">
                    Edit Artikel
                  </button>
                  <button
                    className="btn btn-outline btn-lg"
                    type="button"
                    onClick={() => navigate("../")}
                  >
                    Kembali
                  </button>
                </div>
              </section>
            </div>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  );
};

export default EditArtikelPage;
