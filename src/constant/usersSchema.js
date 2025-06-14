import * as yup from "yup";

export const usersSchema = yup.object().shape({
  name: yup
    .string()
    .required("nama field cannot be empty")
    .max(50, "nama is too long")
    .min(4, "nama is too short"),
  username: yup
    .string()
    .required("username is required")
    .max(20, "username is too long")
    .min(4, "username is too short"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password is too short"),
  kelas: yup.string().required("kelas field cannot be empty"),
  sekolah: yup.string().required("sekolah field cannot be empty"),
  role: yup.string().required("sekolah field cannot be empty"),
  email: yup.string().required("email is required").email("email is not valid"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});


export const usersEditSchema = yup.object().shape({
  name: yup
    .string()
    .required("nama field cannot be empty")
    .max(50, "nama is too long")
    .min(4, "nama is too short"),
  username: yup
    .string()
    .required("username is required")
    .max(20, "username is too long")
    .min(4, "username is too short"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is required"),
  password: yup
    .string()
    .min(8, "password is too short")
    .notRequired(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password confirmation does not match")
    .when("password", {
      is: (val) => val?.length > 0,
      then: (schema) => schema.required("Password confirmation is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  kelas: yup.string().required("kelas field cannot be empty"),
  sekolah: yup.string().required("sekolah field cannot be empty"),
});
