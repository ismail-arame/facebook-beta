import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";

//https://formik.org/docs/guides/validation (DOCUMENTATION)
//this DOCS shows how to integrate Yup and Formik to do VALIDATION
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

import axios from "axios";

// import { login } from "../../reducers/user/userActions";

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  // console.log(login);

  const handleLoginChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "maximum is 20 characters"),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      setError("");
      setLoading(false);
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or Phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
                <div className="login_loading">
                  <DotLoader color="#1876f2" loading={loading} size={30} />
                </div>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password ?
          </Link>
          {error && (
            <div className="error_text" style={{ marginTop: "12px" }}>
              {error}
            </div>
          )}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create New Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}
