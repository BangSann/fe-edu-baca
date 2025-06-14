import * as yup from "yup"

export const artikelSchema = yup.object().shape({
    judul : yup.string().required("Judul is required").max(50 , "Judul is to long").min(5 , "Judul is to short"),
    artikel_link : yup.string().required("Link artikel is required"),
    type : yup.string().required("Type artikel is required"),
    deskripsi : yup.string().required("Deskripsi artikel is required"),
})