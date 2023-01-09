import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";
import { useMediaQuery } from "react-responsive";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);

  const query1150px = useMediaQuery({
    query: "(max-width: 1150px)",
  });

  const LeftLinkInitialNum = query1150px ? 4 : 5;

  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover3">
        <img src={user?.picture} alt="profile img" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, LeftLinkInitialNum).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className="left_link hover3" onClick={() => setVisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(LeftLinkInitialNum, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover3" onClick={() => setVisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span> See less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut link="" img="../../images/ytb.png" name="Youtube Channel" />
        <Shortcut
          link=""
          img="../../images/insta.png"
          name="Instagram Account"
        />
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to="/">Privacy</Link> <span>. </span>
        <Link to="/">Terms</Link> <span>. </span>
        <Link to="/">Advertising</Link> <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>{" "}
        <span>. </span>
        <Link to="/">Cookies</Link> <span>. </span>
        <Link to="/">More</Link> <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
}
