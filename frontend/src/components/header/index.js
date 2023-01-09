import "./style.css";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
//we are importing it from "../../svg/index.js"
import useClickOutside from "../../helpers/clickOutside";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";

import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";

export default function Header() {
  const color = "#65676b";
  const { user } = useSelector((user) => ({ ...user }));

  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenu = useRef(null);
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  const allmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            name=""
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon hover1 active">
          <HomeActive />
          <span className="middle_icon_text">Home</span>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
          <span className="middle_icon_text">Friends</span>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
          <span className="middle_icon_text">Watch</span>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
          <span className="middle_icon_text">Marketplace</span>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
          <span className="middle_icon_text">Gaming</span>
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="profile img" />
          <span className="right_icon_text">My Profile</span>
          <span>{user?.first_name}</span>
        </Link>
        <div className="icon_wrap" ref={allmenu}>
          <div
            className={`circle_icon hover1 ${
              showAllMenu ? "active_header" : ""
            }`}
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
            <span className="right_icon_text">Menu</span>
          </div>
          <CSSTransition
            in={showAllMenu === true}
            unmountOnExit
            timeout={75}
            classNames="show-all-menu"
          >
            <AllMenu setShowAllMenu={setShowAllMenu} />
          </CSSTransition>
        </div>
        <div className="icon_wrap">
          <div className="circle_icon hover1">
            <Messenger />
            <span className="right_icon_text">Messenger</span>
          </div>
        </div>
        <div className="icon_wrap">
          <div className="circle_icon hover1">
            <Notifications />
            <div className="right_notification">5</div>
            <span className="right_icon_text">Notifications</span>
          </div>
        </div>
        <div className="icon_wrap" ref={userMenu}>
          <div
            className={`circle_icon hover1 ${
              showUserMenu ? "active_header" : ""
            }`}
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <ArrowDown />
            <span className="right_icon_text">Account</span>
          </div>
          <CSSTransition
            in={showUserMenu === true}
            unmountOnExit
            timeout={120}
            classNames="show-user-menu"
          >
            <UserMenu user={user} setShowUserMenu={setShowUserMenu} />
          </CSSTransition>
        </div>
      </div>
    </header>
  );
}
