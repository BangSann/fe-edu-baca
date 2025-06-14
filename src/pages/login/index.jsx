import { Form, Formik } from "formik";
import * as yup from "yup";
import TextError from "../../components/textError";
import { useNavigate } from "react-router-dom";

const signInSchema = yup.object().shape({
  username: yup.string().required("Please provide an username"),
  password: yup.string().required("Password cannot be empty"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center h-screen bg-green-100">
      <div className="card shadow bg-white">
        <div className="card-body space-y-3">
          <div className="text-start space-y-2">
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <p className="text-sm font-light">
              Silakan masuk sebagai siswa untuk mengakses materi dan fitur
              pembelajaran.
            </p>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={(values) => {
              console.log(values);
              navigate("/");
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className="space-y-3">
                <div>
                  <input
                    className="input input-xl input-primary w-full"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {errors?.username && touched?.username ? (
                    <TextError>{errors.username}</TextError>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <input
                    className="input input-xl input-primary w-full"
                    type="password"
                    placeholder="password"
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
                  >
                    Sign In
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
