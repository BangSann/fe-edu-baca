import * as yup from "yup";

export const soalSchema = yup.object().shape({
  soal: yup.string().required("soal is required"),
  id_artikel: yup.string().required("artikel is required"),
  opsi_a: yup.string().required("opsi a is required"),
  opsi_b: yup.string().required("opsi b is required"),
  opsi_c: yup.string().required("opsi c is required"),
  opsi_d: yup.string().required("opsi d is required"),
  opsi_e: yup.string().required("opsi e is required"),
  jawaban: yup.string().required("jawaban benar is required"),
  score: yup.string().required("score is required"),
});
