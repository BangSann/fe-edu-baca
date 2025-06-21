import { Form, Formik } from "formik";
import * as yup from "yup";
import TextError from "../../components/textError";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, signIn } from "../../lib/redux/slice/authSlice";
import { toast } from "react-toastify";
import DefaultPage from "../../components/defaultPage";
import { getCookies, setCookie } from "cookies-next";
import { useEffect } from "react";

const signInSchema = yup.object().shape({
  EmailOrUsername: yup.string().required("Please provide an username"),
  password: yup.string().required("Password cannot be empty"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: profileLoading, data: dataProfile } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    async function handleGetProfile() {
      dispatch(getUserProfile());
    }

    handleGetProfile();
  }, []);

  async function handleSignIn(data) {
    try {
      const res = await dispatch(signIn(data));
      if (signIn.fulfilled.match(res)) {
        setCookie("accessToken", res.payload.data.token, {
          // httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 60 * 24 * 60 * 1000), // 60 menit * 24 jam * 60 detik * 1000 ms
        });

        const response = await dispatch(getUserProfile());
        if (getUserProfile.fulfilled.match(response)) {
          toast.success("Berhasil Masuk!");
          if (response.payload.data.role.toLowerCase() == "siswa") {
            navigate("/");
          }
          if (response.payload.data.role.toLowerCase() == "admin") {
            navigate("/eduadmin");
          }
        }
      } else {
        toast.error("username atau Kata sandi salah");
      }
    } catch (error) {
      console.log(error);
      toast.error("unkonwn error !");
    }
  }

  const { accessToken } = getCookies({
    httpOnly: true,
    secure: true,
  });

  if (profileLoading) {
    return;
  } else {
    if (dataProfile?.role && accessToken) {
      return <DefaultPage />;
    }
  }

  return (
    <section className="flex justify-center items-center h-screen bg-green-100">
      <div className="card shadow bg-white">
        <div className="card-body space-y-3">
          <div className="text-start space-y-2">
            <h1 className="text-2xl font-semibold">Masuk</h1>
            <p className="text-sm font-light">
              Silakan masuk sebagai siswa untuk mengakses materi dan fitur
              pembelajaran.
            </p>
          </div>
          <Formik
            initialValues={{ EmailOrUsername: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={(data) => {
              handleSignIn(data);
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className="space-y-3">
                <div>
                  <input
                    className="input input-xl  bg-white w-full"
                    type="text"
                    placeholder="Nama Pengguna"
                    name="EmailOrUsername"
                    value={values.EmailOrUsername}
                    onChange={handleChange}
                  />
                  {errors?.EmailOrUsername && touched?.EmailOrUsername ? (
                    <TextError>{errors.EmailOrUsername}</TextError>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <input
                    className="input input-xl bg-white w-full"
                    type="password"
                    placeholder="Kata Sandi"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors?.password && touched?.password ? (
                    <TextError>{errors.password}</TextError>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-8">
                  <button
                    className="btn btn-lg btn-primary w-full"
                    type="submit"
                    disabled={profileLoading}
                  >
                    Masuk
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
