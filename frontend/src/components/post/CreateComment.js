import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Picker from "emoji-picker-react";
export default function CreateComment({ user }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  //whenever we add some emoji the cursor goes to the end so we want to persist the cursor
  const [cursorPosition, setCursorPosition] = useState(null);
  const textRef = useRef(null);
  const imgInput = useRef(null);

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

  const handleImage = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      console.log("not the one");
      setError(`${file.name} format is not supported .`);
      return;
    } else if (file.size > 1024 * 1024) {
      setError(`${file.name} is too large max 1mb allowed.`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user.picture} alt="user pic" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button
                className="blue_btn"
                onClick={() => {
                  setError("");
                  setCommentImage("");
                }}
              >
                Try Again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <div className="comment_circle_icon hover2">
            <i
              className="emoji_icon"
              onClick={() => setPicker((prev) => !prev)}
            ></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i
              className="camera_icon"
              onClick={() => imgInput.current.click()}
            ></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && !error && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="comment img" />
          <div
            className="small_white_circle hover2"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
