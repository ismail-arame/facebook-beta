import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

export default function ChangePassword({
  email,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  error,
  setError,
  success,
  setSuccess,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const changePassword = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
        { email, password }
      );
      setError("");
      setSuccess(data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const validatePassword = Yup.object().shape({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password Must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),

    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  return (
    <div className="reset_form code_verfication_reset_form change_password_form">
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Please pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => changePassword()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              bottom
            />
            {error && (
              <div className="error_text error_text_change_password">
                {error}
              </div>
            )}
            {success && (
              <div className="success_text error_text_change_password">
                {success}
              </div>
            )}
            {loading && (
              <div className="change_password_loading">
                <DotLoader color="#1876f2" loading={loading} size={30} />
              </div>
            )}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
