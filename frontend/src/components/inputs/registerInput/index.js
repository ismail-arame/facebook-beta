//https://formik.org/docs/api/useField (DOCUMENTATION)
import { ErrorMessage, useField } from "formik";
import "./style.css";

import { useMediaQuery } from "react-responsive";

export default function RegisterInput({
  placeholder,
  bottom,
  left,
  right,
  ...props
}) {
  const [field, meta] = useField(props);
  //returns true if the viewport width is higher than 850px , returns false if it's lower than 850px
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";

  console.log("view1 : ", view1);
  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={
            view3 && left
              ? "input_error input_error_desktop input_error_desktop_left_side error_animation_register_left_side"
              : view3 && right
              ? "input_error input_error_desktop input_error_desktop_right_side error_animation_register_right_side"
              : view1 && field.name === "last_name"
              ? "input_error error_animation_register_right_side"
              : "input_error error_animation_register_left_side"
          }
          style={{
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                // view3 && field.name !== "last_name"
                //   ? "error_arrow_left"
                //   : view3 && field.name === "last_name"
                //   ? "error_arrow_right"
                //   : "error_arrow_bottom"
                view3 && left
                  ? "error_arrow_left"
                  : view3 && right
                  ? "error_arrow_right"
                  : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
