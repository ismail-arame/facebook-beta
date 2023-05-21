import "./style.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactsPopup from "./reactsPopup";
import useLongPress from "../../helpers/useLongPress";
import { useMediaQuery } from "react-responsive";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
export default function Post({ post, user }) {
  //is the Background Text white or black (that depends on the background)
  const [isBgTextWhite, setIsBgTextWhite] = useState(false);
  //the post reacts gif popup
  const [postReactsPopupVisible, setPostReactsPopupVisible] = useState(false);
  //the post menu popup
  const [showPostMenu, setShowPostMenu] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });

  console.log("isMobile : ", isMobile);
  // console.log("post db: ", post);
  useEffect(() => {
    if (post.background) {
      if (
        post.background === `../../../images/postbackgrounds/2.jpg` ||
        post.background === `../../../images/postbackgrounds/3.jpg` ||
        post.background === `../../../images/postbackgrounds/4.jpg` ||
        post.background === `../../../images/postbackgrounds/5.jpg` ||
        post.background === `../../../images/postbackgrounds/7.jpg` ||
        post.background === `../../../images/postbackgrounds/8.jpg`
      ) {
        setIsBgTextWhite(true);
      }
    }
  }, [post]);
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "just now",
      ss: "%ss",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1M",
      MM: "%dM",
      y: "1Y",
      yy: "%dY",
    },
  });

  const onLongPress = () => {
    console.log("longpress is triggered");
    setTimeout(() => {
      setPostReactsPopupVisible(true);
    }, 500);
  };

  const onClick = () => {
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 100,
  };
  let longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  if (!isMobile) {
    //if the width of the screen is not mobile then we dont want to use the longPressEvent we want to use only the Hover Event
    longPressEvent = null;
  }

  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="user pic" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "cover" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              <div className="post_profile_dot">.</div>
              <div className="public_svg">
                <Public color="#828387" />
              </div>
            </div>
          </div>
        </Link>
        <div
          className="post_header_right_button hover1"
          onClick={() => setShowPostMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div
            className={`post_bg_text ${
              isBgTextWhite ? "post_bg_white_text" : "post_bg_black_text"
            }`}
          >
            {post.text}
          </div>
        </div>
      ) : (
        <div>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "post_preview1"
                  : post.images.length === 2
                  ? "post_preview2"
                  : post.images.length === 3
                  ? "post_preview3"
                  : post.images.length === 4
                  ? "post_preview4"
                  : "post_preview5"
              }
            >
              {post.images.map((image, i) => {
                return i < 4 ? (
                  <img key={i} src={image.url} alt="" />
                ) : i === 4 ? (
                  <div
                    key={i}
                    className={
                      post.images.length > 5
                        ? "post_fifth-image post_above_five_images"
                        : "post_fifth-image"
                    }
                  >
                    <img src={image.url} alt="" />
                    {post.images.length > 5 ? (
                      <span>+{post.images.length - 5}</span>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs"></div>
          <div className="reacts_count_num"></div>
        </div>
        <div className="to_right">
          <div className="comments_count">
            <span>12</span>
            <i className="comment_count_icon"></i>
          </div>
          <div className="shares_count">
            <span>1</span>
            <i className="share_count_icon"></i>
          </div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          postReactsPopupVisible={postReactsPopupVisible}
          setPostReactsPopupVisible={setPostReactsPopupVisible}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setPostReactsPopupVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setPostReactsPopupVisible(false);
            }, 500);
          }}
          {...longPressEvent}
        >
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order">
          <CreateComment user={user} />
        </div>
      </div>
      {showPostMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post.images?.length}
          setShowPostMenu={setShowPostMenu}
        />
      )}
    </div>
  );
}
