import * as yup from "yup";

export const artikelSchema = yup.object().shape({
  judul: yup
    .string()
    .required("Judul wajib diisi")
    .max(50, "Judul terlalu panjang (maksimal 50 karakter)")
    .min(5, "Judul terlalu pendek (minimal 5 karakter)"),

  artikel_link: yup
    .string()
    .required("Link artikel wajib diisi")
    .url("Format link tidak valid"),

  type: yup.string().required("Type artikel wajib diisi"),

  deskripsi: yup.string().required("Deskripsi artikel wajib diisi"),

  image: yup
    .mixed()
    .required("File gambar wajib diisi")
    .test(
      "fileType",
      "Hanya file gambar yang diperbolehkan (jpg, jpeg, png)",
      (value) => {
        if (!value) return false;

        // Jika value dari Formik berupa FileList (dari input file)
        const file = value instanceof File ? value : value[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return file && allowedTypes.includes(file.type);
      }
    )
    .test("fileSize", "Ukuran file maksimal 2MB", (value) => {
      if (!value) return false;
      const file = value instanceof File ? value : value[0];
      return file && file.size <= 2 * 1024 * 1024;
    }),
});

export const editArtikelSchema = yup.object().shape({
  judul: yup.string().required("Judul wajib diisi"),
  artikel_link: yup.string().required("Link artikel wajib diisi").url(),
  type: yup.string().required("Type artikel wajib diisi"),
  deskripsi: yup.string().required("Deskripsi wajib diisi"),
  image: yup
    .mixed()
    .test(
      "fileType",
      "Hanya file gambar yang diperbolehkan (jpg, jpeg, png)",
      (value) => {
        if (!value) return true; // ✅ Tidak wajib
        const file = value instanceof File ? value : value?.[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return file && allowedTypes.includes(file.type);
      }
    )
    .test("fileSize", "Ukuran file maksimal 2MB", (value) => {
      if (!value) return true; // ✅ Tidak wajib
      const file = value instanceof File ? value : value?.[0];
      return file && file.size <= 2 * 1024 * 1024;
    }),
});

