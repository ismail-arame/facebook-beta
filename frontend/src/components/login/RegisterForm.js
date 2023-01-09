import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterInput from "../inputs/registerInput";

import * as Yup from "yup";
import Cookies from "js-cookie";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

import axios from "axios";

import { login } from "../../reducers/user/userActions";

export default function RegisterForm({ visible, setVisible }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  // console.log("userInfos : ", userInfos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const yearTemp = new Date().getFullYear();

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 12 - index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(
    new Array(getDays()),
    (val, index) => getDays() - index
  );

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object().shape({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Very Short !")
      .max(16, "Very Long !")
      .matches(/^[aA-zZ]+$/, "Only characters allowed !"),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Very Short !")
      .max(16, "Very Long !")
      .matches(/^[aA-zZ]+$/, "Only characters allowed !"),
    email: Yup.string()
      .required("Email is needed to log in an or reset password.")
      .email("Must be a valid email address.")
      .max(50, "maximum is 50 characters."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password Must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //Sign up Submit function
  const registerSubmit = async () => {
    try {
      console.log("env frontend url : ", process.env.REACT_APP_BACKEND_URL);
      setLoading(true);
      // `http://localhost:8000/register`
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        setLoading(false);
        dispatch(login(rest));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div
        className={`${
          visible ? "register register_fadein_animation " : "register"
        }`}
      >
        <div className={"register_header"}>
          <div className="circleX" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            console.log(picked_date);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "It looks like you've entered the wrong infos, Please make sure that you use your real date of birth"
              );
              console.log("underage you're not 14");
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "It looks like you've entered the wrong infos, Please make sure that you use your real date of birth"
              );
              console.log("you are more than 70");
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender, you can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line" style={{ marginTop: "16px" }}>
                <RegisterInput
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  onChange={handleRegisterChange}
                  left
                />
                <RegisterInput
                  type="text"
                  name="last_name"
                  placeholder="Surname"
                  onChange={handleRegisterChange}
                  right
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  name="email"
                  placeholder="Mobile number or email address"
                  onChange={handleRegisterChange}
                  left
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  name="password"
                  placeholder="New password"
                  onChange={handleRegisterChange}
                  right
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  left
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                  right
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and{" "}
                <span>Cookie Policy</span> You may receive SMS notifications
                from us and can opt out at any time
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
