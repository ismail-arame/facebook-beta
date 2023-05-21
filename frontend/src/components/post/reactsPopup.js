import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";

const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];

export default function ReactsPopup({
  postReactsPopupVisible,
  setPostReactsPopupVisible,
}) {
  const postReactPopupRef = useRef(null);
  useClickOutside(postReactPopupRef, () => {
    setPostReactsPopupVisible(false);
  });
  return (
    <>
      {postReactsPopupVisible && (
        <div
          className="reacts_popup"
          ref={postReactPopupRef}
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
        >
          {reactsArray.map((react, i) => (
            <div className="react" key={i}>
              <img src={react.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
