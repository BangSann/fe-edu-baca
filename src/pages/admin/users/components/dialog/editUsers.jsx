import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import {
  usersEditSchema,
  usersSchema,
} from "../../../../../constant/usersSchema";
import InputField from "../../../components/fieldInput";
import TextError from "../../../../../components/textError";
import { useDispatch, useSelector } from "react-redux";
import {
  editUsersDataAdmin,
  getUsersDataAdmin,
} from "../../../../../lib/redux/slice/usersAdminSlice";

const EditUsers = ({ onClose, selectedData }) => {
  const { data: kelasData } = useSelector((state) => state.kelasAdmin);
  const { data: sekolahData } = useSelector((state) => state.sekolahAdmin);
  const { isLoading } = useSelector((state) => state.usersAdmin);

  const dispatch = useDispatch();

  async function handleEditUsers({ data, action }) {
    try {
      const res = await dispatch(editUsersDataAdmin(data));

      if (editUsersDataAdmin.fulfilled.match(res)) {
        toast.success("Berhasil mengedit pengguna !");
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
          id: selectedData?.id || "",
          name: selectedData?.name || "",
          username: selectedData?.username || "",
          email: selectedData?.email || "",
          password: "",
          role : selectedData?.role,
          password_confirmation: "",
          sekolah: selectedData?.sekolah?.id || "",
          kelas: selectedData?.kelas?.id,
        }}
        validationSchema={usersEditSchema}
        enableReinitialize
        onSubmit={(data, action) => {
          handleEditUsers({ data, action });
        }}
      >
        {({ errors, values, handleChange }) => (
          <Form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label={"Nama"}
                name={"name"}
                placeholder={"Name"}
                type={"text"}
                error={errors.name}
                onchange={handleChange}
                values={values.name}
              />
              <InputField
                label={"Username"}
                name={"username"}
                placeholder={"Username"}
                type={"text"}
                error={errors.username}
                onchange={handleChange}
                values={values.username}
              />
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"Email"}
                type={"email"}
                error={errors.email}
                onchange={handleChange}
                values={values.email}
              />
              <InputField
                label={"Password Baru"}
                name={"password"}
                placeholder={"Password"}
                type={"password"}
                error={errors.password}
                onchange={handleChange}
                values={values.password}
              />
              <InputField
                label={"Konfirmasi Password"}
                name={"password_confirmation"}
                placeholder={"Konfirmasi Password"}
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
                  name="sekolah"
                  value={values.sekolah}
                  onChange={handleChange}
                >
                  <option value="">Pilih Sekolah</option>
                  {sekolahData?.map((item, i) => (
                    <option
                      value={item.id}
                      key={i}
                      selected={item.id == values.sekolah}
                    >
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
                      <option
                        value={item_?.id || ""}
                        key={i}
                        selected={item_?.id == values.kelas}
                      >
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
                Simpan Perubahan
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

export default EditUsers;
