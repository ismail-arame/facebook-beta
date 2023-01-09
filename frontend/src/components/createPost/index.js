import "./style.css";

import { Feeling, LiveVideo, Photo } from "../../svg";
import { useMediaQuery } from "react-responsive";

export default function CreatePost({ user }) {
  const query340px = useMediaQuery({
    query: "(max-width: 340px)",
  });
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2">
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          {query340px ? "Live" : "Live video"}
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/activity
        </div>
      </div>
    </div>
  );
}
