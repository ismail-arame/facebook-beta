//https://formik.org/docs/api/useField (DOCUMENTATION)
import { ErrorMessage, useField } from "formik";
import "./style.css";

import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  //returns true if the viewport width is higher than 850px , returns false if it's lower than 850px
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view1200 = useMediaQuery({
    query: "(max-width: 1200px)",
  });
  // const

  console.log("desktopView : ", desktopView);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView && view1200 && field.name === "password"
              ? "input_error input_error_desktop password_error"
              : desktopView
              ? "input_error input_error_desktop input_error_desktop_login error_animation_desktop_login"
              : "input_error error_animation_mobile_login"
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView && view1200 && field.name === "confirmPassword"
              ? "input_error confirmPassword_error"
              : desktopView
              ? "input_error input_error_desktop input_error_desktop_login error_animation_desktop_login"
              : "input_error error_animation_mobile_login"
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
}
