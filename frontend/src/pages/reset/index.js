import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/user/userActions";
import Cookies from "js-cookie";

import { useState } from "react";

import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);
  const [userInfos, setUserInfos] = useState("");

  console.log("user", user);
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="user img" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                Cookies.set("user", "");
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            userInfos={userInfos}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            email={email}
            code={code}
            setCode={setCode}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
          />
        )}
      </div>
    </div>
  );
}
