import { Form, Formik } from "formik";
import { usersSchema } from "../../../../../constant/usersSchema";
import { toast } from "react-toastify";
import InputField from "../../../components/fieldInput";
import { useDispatch, useSelector } from "react-redux";
import TextError from "../../../../../components/textError";
import {
  addUsersDataAdmin,
  getUsersDataAdmin,
} from "../../../../../lib/redux/slice/usersAdminSlice";

const AddUsers = ({ onClose }) => {
  const { data: kelasData } = useSelector((state) => state.kelasAdmin);
  const { data: sekolahData } = useSelector((state) => state.sekolahAdmin);
  const { isLoading } = useSelector((state) => state.usersAdmin);

  const dispatch = useDispatch();

  async function handleAddUsers({ data, action }) {
    try {
      const res = await dispatch(addUsersDataAdmin(data));

      if (addUsersDataAdmin.fulfilled.match(res)) {
        toast.success("Berhasil menambahkan pengguna !");
        action.resetForm();
        onClose();
      } else {
        toast.error(res.payload.response.data.message);
      }
      dispatch(getUsersDataAdmin());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          password_confirmation: "",
          sekolah: "",
          kelas: "",
          email: "",
          role: "SISWA",
        }}
        validationSchema={usersSchema}
        onSubmit={(data, action) => {
          handleAddUsers({ data, action });
          // console.log(data);
          // action.resetForm();
          // onClose();
        }}
      >
        {({ errors, values, handleChange, setValues }) => (
          <Form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label={"Nama"}
                name={"name"}
                placeholder={"Nama"}
                type={"text"}
                error={errors.name}
                onchange={handleChange}
                values={values.name}
              />
              <InputField
                label={"Nama Belakang"}
                name={"username"}
                placeholder={"Nama Belakang"}
                type={"text"}
                error={errors.username}
                onchange={handleChange}
                values={values.username}
              />
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"email@gmail.com"}
                type={"email"}
                error={errors.email}
                onchange={handleChange}
                values={values.email}
              />
              <InputField
                label={"kata sandi"}
                name={"password"}
                placeholder={"kata sandi"}
                type={"password"}
                error={errors.password}
                onchange={handleChange}
                values={values.password}
              />
              <InputField
                label={"Konfirmasi Kata Sandi"}
                name={"password_confirmation"}
                placeholder={"Konfirmasi kata sandi"}
                type={"password"}
                error={errors.password_confirmation}
                onchange={handleChange}
                values={values.password_confirmation}
              />
              <InputField
                label={"Role"}
                name={"role"}
                placeholder={"role"}
                type={"text"}
                error={errors.role}
                onchange={handleChange}
                values={values.role}
              />
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Sekolah</label>
                <select
                  className="select select-md w-full"
                  value={values.sekolah}
                  onChange={(e) => {
                    handleChange(e);
                    setValues((prev) => ({
                      ...prev,
                      sekolah: e.target.value,
                      kelas: "",
                    }));
                  }}
                  name="sekolah"
                >
                  <option value="">pilih sekolah</option>
                  {sekolahData?.map((item, i) => (
                    <option value={item?.id} key={i}>
                      {item.nama_sekolah}
                    </option>
                  ))}
                </select>

                {errors.sekolah && <TextError>{errors.sekolah}</TextError>}
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="kelas">Kelas</label>
                <select
                  className="select select-md w-full"
                  name="kelas"
                  value={values.kelas}
                  onChange={handleChange}
                  disabled={!values.sekolah} // mencegah memilih kelas sebelum sekolah
                >
                  <option value="">pilih kelas</option>
                  {kelasData
                    ?.filter((item) => item.id == values.sekolah)[0]
                    ?.kelas.map((item_, i) => (
                      <option value={item_?.id || ""} key={i}>
                        {item_.kelas}
                      </option>
                    ))}
                </select>
                {errors.kelas && <TextError>{errors.kelas}</TextError>}
              </div>
            </div>
            <div className="flex space-x-2 pt-4 justify-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                Tambah Data
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
    </section>
  );
};

export default AddUsers;
