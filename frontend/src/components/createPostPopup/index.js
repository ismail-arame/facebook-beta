//the create post popup where we create posts
import { useState } from "react";
import "./style.css";

import EmojiPickerBackgrounds from "./emojiPickerBackgrounds";
import { useRef } from "react";
import AddToYourPost from "./addToYourPost";
import ImagePreview from "./imagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";

// https://www.npmjs.com/package/react-spinners
import DotLoader from "react-spinners/DotLoader";
import PostError from "./postError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
import PostLoading from "./postLoading";

export default function CreatePostPopup({ user, setCreatePostVisible }) {
  const [text, setText] = useState("");
  //showPrev is true => add photos and videos section
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTextBelowEighty, setIsTextBelowEighty] = useState(true);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  //background reference
  const bgRef = useRef(null);

  const popupRef = useRef(null);
  useClickOutside(popupRef, () => {
    setCreatePostVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setCreatePostVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      // convert base64/URLEncoded data component to raw binary data held in a string because cloudinary doesn't accept base64 data
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post Images`;
      //when we send images we send them as formdata
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((img) => {
        formData.append("file", img);
      });
      const uplaodImagesResponse = await uploadImages(
        formData,
        path,
        user.token
      );
      // console.log("response", response);
      const createPostResponse = await createPost(
        null,
        null,
        text,
        uplaodImagesResponse,
        user.id,
        user.token
      );
      console.log("response", createPostResponse);
      setLoading(false);
      if (createPostResponse === "ok") {
        setImages([]);
        setText("");
        setCreatePostVisible(false);
        setError("");
      } else {
        setError(createPostResponse);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setCreatePostVisible(false);
        setError("");
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div>
      {loading ? (
        <div className="PostingLoader_wrap">
          <DotLoader speedMultiplier={1.3} color="#050505" size={38} />
          <div className="postingLoader_paragraph">Posting</div>
        </div>
      ) : (
        ""
      )}
      <div className="blur create_post_popup">
        <div
          className={
            loading && background
              ? "postBox postBox_bg_maxheight"
              : loading && !background
              ? "postBox postBox_maxheight"
              : background
              ? "postBox postBox_bg_maxheight"
              : "postBox postBox_maxheight"
          }
          ref={popupRef}
        >
          {error && <PostError error={error} setError={setError} />}
          {loading && <PostLoading />}
          <div className="box_header">
            <div
              className="small_circle hover4"
              onClick={() => {
                setCreatePostVisible(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <span>Create Post</span>
          </div>
          <div className="box_profile">
            <img
              src={user.picture}
              alt="user pic"
              className="box_profile_img"
            />
            <div className="box_col">
              <div className="box_profile_name">
                {user.first_name} {user.last_name}
              </div>
              <div className="box_privacy hover4">
                <img src="../../../icons/public.png" alt="public pic" />
                <span>Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
          {!showPrev ? (
            <EmojiPickerBackgrounds
              user={user}
              text={text}
              setText={setText}
              isTextBelowEighty={isTextBelowEighty}
              setIsTextBelowEighty={setIsTextBelowEighty}
              background={background}
              setBackground={setBackground}
              bgRef={bgRef}
            />
          ) : (
            <ImagePreview
              user={user}
              text={text}
              setText={setText}
              images={images}
              setImages={setImages}
              setShowPrev={setShowPrev}
              setError={setError}
            />
          )}
          <AddToYourPost
            showPrev={showPrev}
            setShowPrev={setShowPrev}
            setBackground={setBackground}
            bgRef={bgRef}
          />
          <div className="post_submit_container">
            <button
              className="post_submit"
              onClick={() => {
                postSubmit();
              }}
              disabled={loading}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
