import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

export default function CodeVerification({
  email,
  code,
  setCode,
  loading,
  setLoading,
  error,
  setError,
  setVisible,
}) {
  const verifyCode = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setLoading(false);
      setError("");
      setVisible(3);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const validateCode = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .min(5, "Code Must be 5 characters long")
      .max(5, "Code Must be 5 characters long"),
  });
  return (
    <div className="reset_form code_verfication_reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that have been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              placeholder="Code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            {error && (
              <div className="error_text error_text_verify_code">{error}</div>
            )}
            {loading && (
              <div className="verify_code_loading">
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
