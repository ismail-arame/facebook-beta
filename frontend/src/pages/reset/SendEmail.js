import { Link } from "react-router-dom";
import axios from "axios";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";

export default function SendEmail({
  email,
  userInfos,
  loading,
  setLoading,
  error,
  setError,
  setVisible,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setVisible(2);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfos.picture} alt="" />
          <span className="searched_email">{userInfos.email}</span>
          <span>Facebook user</span>
        </div>
        {error && (
          <div className="error_text error_text_send_email">{error}</div>
        )}
        {loading && (
          <div className="send_email_loading">
            <DotLoader color="#1876f2" loading={loading} size={30} />
          </div>
        )}
        <div className="reset_form_btns">
          <Link to="/login" className="gray_btn">
            Not you?
          </Link>
          <button
            onClick={() => {
              sendEmail();
            }}
            className="blue_btn"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
