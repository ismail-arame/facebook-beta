import EmojiPickerBackgrounds from "./emojiPickerBackgrounds";
import { useRef, useState } from "react";
//we used the EmojiPickerComponent twice in postpopup to distinguish between the two we pass type2 argument to the imagePreview
//so we can use that argument to change the UI of the imagePreview component
export default function ImagePreview({
  user,
  text,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
}) {
  const imageInputRef = useRef(null);
  const [isHoverSmallWhiteCercle, setIsHoverSmallWhiteCercle] = useState(false);
  const [isHoverAddPicsWrap, setIsHoverAddPicsWrap] = useState(false);
  const handleImages = (e) => {
    console.log(e);
    // let files = e.target.files;
    // to convert from filelist to an array we use Array.from()
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      console.log("img", img.type);
      if (img.type === "image/jpeg") console.log("hello from ENSA");
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported! only Jpeg ,Png ,Webp and Gif are allowed`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024) {
        setError(`${img.name} size is too large max 1mb is allowed`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      //new FileReader => able to read the file
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
    console.log("files", files);
  };
  return (
    <div
      className={`overflow_a ${
        isHoverAddPicsWrap ? "overflow_a_scrollbar" : ""
      }`}
      onMouseEnter={() => {
        setIsHoverAddPicsWrap(true);
      }}
      onMouseLeave={() => {
        setIsHoverAddPicsWrap(false);
      }}
    >
      <EmojiPickerBackgrounds user={user} text={text} setText={setText} type2 />
      <div
        className={`add_pics_wrap ${
          !isHoverAddPicsWrap ? "add_pics_wrap2" : ""
        }`}
      >
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp, image/gif"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle hover1"
              onClick={() => {
                setShowPrev((prev) => !prev);
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : "preview5"
              }
            >
              {images.map((img, i) => {
                return i < 4 ? (
                  <img key={i} src={img} alt="" />
                ) : i === 4 ? (
                  <div
                    key={i}
                    className={
                      images.length > 5
                        ? "fifth-image above_five_images"
                        : "fifth-image"
                    }
                  >
                    <img src={img} alt="" />
                    {images.length > 5 ? <span>+{images.length - 5}</span> : ""}
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className={`add_pics_inside1 ${
              !isHoverSmallWhiteCercle ? "hover2 add_circle_hover" : ""
            }`}
            onClick={() => {
              if (!isHoverSmallWhiteCercle) imageInputRef.current.click();
            }}
          >
            <div
              className="small_white_circle hover2"
              onClick={() => {
                setShowPrev((prev) => !prev);
              }}
              onMouseEnter={() => {
                setIsHoverSmallWhiteCercle(true);
              }}
              onMouseLeave={() => {
                setIsHoverSmallWhiteCercle(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div className="add_col">
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">
            Add photos and videos from your mobile device.
          </div>
          <span className="addphone_btn hover4">Add</span>
        </div>
      </div>
    </div>
  );
}
