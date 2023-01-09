import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../reducers/user/userActions";
import Cookies from "js-cookie";
export default function PrimaryMenu({ user, setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="menu-wrapper">
      <Link to="/profile" className="mmenu_header hover3">
        <img src={user?.picture} alt="profile img" />
        <div className="mmenu_col">
          <span>
            {user?.first_name} {user?.last_name}
          </span>
          <span>see your profile</span>
        </div>
      </Link>
      <div className="mmenu_splitter"></div>
      <div className="mmenu_main hover3">
        <div className="small_circle">
          <i className="report_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span1">Give feedback</div>
          <div className="mmenu_span2">Help us improve facebook</div>
        </div>
      </div>
      <div className="mmenu_splitter"></div>
      <div
        className="mmenu_item hover3"
        onClick={() => {
          setVisible(1);
        }}
      >
        <div className="small_circle">
          <i className="settings_filled_icon"></i>
        </div>
        <span>Settings & privacy</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div
        className="mmenu_item hover3"
        onClick={() => {
          setVisible(2);
        }}
      >
        <div className="small_circle">
          <i className="help_filled_icon"></i>
        </div>
        <span>Help & support</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div
        className="mmenu_item hover3"
        onClick={() => {
          setVisible(3);
        }}
      >
        <div className="small_circle">
          <i className="dark_filled_icon"></i>
        </div>
        <span>Display & accessibility</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div
        className="mmenu_item hover3"
        onClick={() => {
          Cookies.set("user", "");
          dispatch(logout());
          navigate("/login");
        }}
      >
        <div className="small_circle">
          <i className="logout_filled_icon"></i>
        </div>
        <span>Log Out</span>
      </div>
      <footer>
        <span>
          Privacy · Terms · Advertising · Ad Choices · Cookies · · Ismail
          Company hh © 2022
        </span>
      </footer>
    </div>
  );
}
