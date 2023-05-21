// import Picker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";

export default function EmojiPickerBackgrounds({
  text,
  setText,
  user,
  isTextBelowEighty,
  setIsTextBelowEighty,
  background,
  setBackground,
  type2,
  bgRef, //refrence to where the element of the background image is put
}) {
  const [picker, setPicker] = useState(false);
  const [showBackgs, setShowBackgs] = useState(false);
  //whenever we add some emoji the cursor goes to the end so we want to persist the cursor
  const [cursorPosition, setCursorPosition] = useState(null);
  const textRef = useRef(null);
  const [isTextareaBlack, setIsTextareaBlack] = useState(true);
  useEffect(() => {
    //setting the end of the cursor to the current cursor position
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);

    //the cursor position will be right next to the emoji added by the emoji picker
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];
  const backgroundHandler = (i) => {
    if (i === 1 || i === 2 || i === 3 || i === 4 || i === 6 || i === 7) {
      setIsTextareaBlack(false);
    } else {
      setIsTextareaBlack(true);
    }

    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    bgRef.current.classList.remove("bgHandler");
    setBackground("");
  };
  console.log("is it black", isTextareaBlack);
  return (
    <div
      className={type2 ? "images_input" : "background_maxheight"}
      ref={bgRef}
    >
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          maxLength={200}
          value={text}
          placeholder={`What's on your mind, ${user.first_name}?`}
          onChange={(e) => {
            setText(e.target.value);
            if (!type2) {
              if (text.length > 85) {
                setIsTextBelowEighty(false);
              } else {
                setIsTextBelowEighty(true);
              }
            }
          }}
          style={{
            paddingTop: `${
              background && isTextBelowEighty
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : background && !isTextBelowEighty
                ? Math.abs(textRef.current.value.length * 0.1 - 45)
                : "0"
            }%`,
            color: `${
              background && isTextareaBlack
                ? "black"
                : background
                ? "white"
                : ""
            }`,
          }}
          className={`post_input ${
            isTextBelowEighty && background
              ? "post_input_fontsize_30"
              : isTextBelowEighty
              ? "post_input_fontsize_24"
              : "post_input_fontsize_15"
          } ${type2 ? "post_input2" : ""}`}
        ></textarea>
      </div>
      <div
        className={
          !type2 && background
            ? "post_emojis_wrap_background"
            : !type2
            ? "post_emojis_wrap"
            : ""
        }
      >
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <EmojiPicker
              onEmojiClick={handleEmoji}
              height={300}
              lazyLoadEmojis={true}
              emojiStyle="facebook"
              previewConfig={{
                showPreview: false,
              }}
              searchDisabled={true}
            />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            className="colorful_img"
            onClick={() => {
              setShowBackgs((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBackgs ? (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt="post background images"
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        ) : (
          ""
        )}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
