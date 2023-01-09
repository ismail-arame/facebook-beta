import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

export default function SearchAccount({
  email,
  setEmail,
  loading,
  setLoading,
  error,
  setError,
  setUserInfos,
  setVisible,
}) {
  const validateEmail = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "max characters is 50"),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        {
          email,
        }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      console.log("error : ", error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form search_account">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              placeholder="Email address or phone number"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && <div className="error_text">{error}</div>}
            {loading && (
              <div className="search_account_loading">
                <DotLoader color="#1876f2" loading={loading} size={30} />
              </div>
            )}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
