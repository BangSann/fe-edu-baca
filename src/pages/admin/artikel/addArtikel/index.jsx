import { Form, Formik } from "formik";
import AdminLayout from "../../layout";
import InputField from "../../components/fieldInput";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import TextError from "../../../../components/textError";
import { artikelSchema } from "../../../../constant/artikelSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArtikel } from "../../../../lib/redux/slice/artikelAdminSlice";

const AddArtikelPage = () => {
  const navigate = useNavigate();

  // redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.artikelAdmin);
  // redux state

  // state form
  const [imagePreview, setImagePreview] = useState(null);

  // state form

  async function handleAddArtikel({ data, action }) {
    try {
      const res = await dispatch(createArtikel(data));
      console.log(res);
      if (createArtikel.fulfilled.match(res)) {
        toast.success("Berhasil menambahkan Artikel !");
        navigate("../")
        action.resetForm();
      } else {
        toast.error("Gagal Menambahkan data artikel");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AdminLayout>
      <section className="mb-3 flex w-full gap-2 justify-between items-center">
        <h1 className="text-lg font-semibold">Tambah Data Artikel</h1>
      </section>
      <Formik
        initialValues={{
          judul: "",
          artikel_link: "",
          type: "",
          deskripsi: "",
          image: "",
        }}
        validationSchema={artikelSchema}
        onSubmit={(data, action) => handleAddArtikel({ data, action })}
      >
        {({ errors, values, handleChange, setValues }) => (
          <Form>
            <div className="grid grid-cols-3 gap-3">
              <section className="col-span-2 bg-gray-200 h-[85vh]">
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
                    Tambah Tautan Artikel
                  </button>
                  {errors.artikel_link && (
                    <TextError>{errors.artikel_link}</TextError>
                  )}
                </div>

                <div className="space-y-1 flex flex-col">
                  <label htmlFor="">Gambar</label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-48 object-contain border rounded"
                    />
                  )}
                  <input
                    name="image"
                    type="file"
                    className="file-input w-full"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }

                      setValues((prev) => ({
                        ...prev,
                        image: event.currentTarget.files[0],
                      }));
                    }}
                  />
                  {errors.image && <TextError>{errors.image}</TextError>}
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
                  <label htmlFor="">Tipe</label>
                  <select
                    className={`select select-md w-full ${
                      errors.type && "outline outline-red-500"
                    }`}
                    name="type"
                    onChange={handleChange}
                    value={values.type}
                  >
                    <option value="">Pilih fungsi artikel</option>
                    <option value="quiz">Kuis</option>
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
                  <button
                    className="btn  btn-primary btn-lg"
                    type="submit"
                    disabled={isLoading}
                  >
                    Tambah Artikel
                  </button>
                  <button
                    className="btn btn-outline btn-lg"
                    type="button"
                    onClick={() => navigate("../")}
                    disabled={isLoading}
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

export default AddArtikelPage;
