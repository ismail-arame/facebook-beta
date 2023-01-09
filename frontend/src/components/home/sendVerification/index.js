import { useState } from "react";
import "./style.css";
import axios from "axios";

export default function SendVerification({ user }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //resend email verification link function
  const sendEmailVerificationLink = async () => {
    try {
      console.log("link backend : ", process.env.REACT_APP_BACKEND_URL);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month of creating and then i did what i did then guys come on
      </span>
      <a
        onClick={() => {
          sendEmailVerificationLink();
        }}
      >
        click here to resend verification email link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
